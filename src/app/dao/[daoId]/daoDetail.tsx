/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDaoCtx } from '@/context/daoContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAccount } from 'wagmi'
import { DAOResponse, OptionsResponse, SubmitVoteDto } from '@/types/dao'
import { DaoType } from '@/enums/daoType'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useReadContract } from 'wagmi'
import contractConfig from '@/config/contract-config'

export default function DAODetail({
  daoId,
  daoDetail,
  options,
}: {
  daoId: number
  daoDetail: DAOResponse
  options: OptionsResponse[]
}) {
  const supabase = createClientComponentClient()
  const { setnftIdsForWallet, nftIdsForWallet } = useDaoCtx()

  // Connect Wallet Modal
  const { openConnectModal } = useConnectModal()
  const { isConnected, address } = useAccount()

  // Count of vote
  const [voteCount, setVoteCount] = useState<number>(0)
  // Available NFT Ids to vote
  const [availableNFTIds, setAvailableNFTIds] = useState<Array<any>>([])
  // Eligible of vote
  const [eligibleVote, setEligibleVote] = useState<boolean>(true)
  // Status of vote
  const [hasVote, setHasVote] = useState<boolean>(false)

  const { data: userNFTIds, error } = useReadContract({
    ...contractConfig,
    functionName: 'walletOfOwner',
    args: [address ?? '0x0000'],
  })

  useEffect(() => {
    if (userNFTIds) {
      // Convert BigInt array to number array
      const userNFTIdsAsNumber = userNFTIds.map((id) => Number(id))

      setnftIdsForWallet(userNFTIdsAsNumber)
    } else if (error) {
      console.error('Error reading contract:', error)
    }
  }, [userNFTIds, error, setnftIdsForWallet])

  useEffect(() => {
    const getAvailableVotes = async () => {
      const usedNfts: Array<any> = []
      let remainVote: number = 0

      const { data, error } = await supabase
        .from('vote_mapping')
        .select('nft_id')
        .eq('dao_id', daoId)
        .in('nft_id', nftIdsForWallet.length > 0 ? nftIdsForWallet : [])

      if (data) {
        remainVote = nftIdsForWallet.length - data.length
      }

      if (error) {
        console.error('Error Get Votes:', error.message)
        return
      }

      if (data && Array.isArray(data)) {
        for (const nft of data) {
          usedNfts.push(String(nft.nft_id))
        }

        const unusedNfts = nftIdsForWallet.filter(
          (item) => !usedNfts.includes(item),
        )

        setAvailableNFTIds(unusedNfts)

        if (unusedNfts.length === 0) {
          setEligibleVote(false)
        }
      } else {
        console.error('Data is not an array or is undefined.')
      }

      setVoteCount(remainVote)
    }

    getAvailableVotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftIdsForWallet])

  // Handle Click Options
  const [isClickedOption, setIsClickedOption] = useState<number>(0)
  const [isSubmitDisabled, setSubmitDisabled] = useState(true)

  const onClickOption = (index: number) => {
    setIsClickedOption(index)
    setSubmitDisabled(false)
  }

  // Submit Vote
  const submitVote = async (isNeutralVote: boolean) => {
    let req: SubmitVoteDto

    if (isNeutralVote) {
      req = {
        nft_id: Number(availableNFTIds[0]),
        dao_id: daoId,
        option_id: undefined,
        isNeutral: true,
      }
    } else {
      req = {
        nft_id: Number(availableNFTIds[0]),
        dao_id: daoId,
        option_id: isClickedOption,
        isNeutral: false,
      }
    }

    const { nft_id, dao_id, option_id, isNeutral } = req

    const { error } = await supabase
      .from('vote_mapping')
      .insert([{ nft_id, dao_id, option_id, isNeutral }])

    if (error) {
      console.error('Error Submit Vote:', error.message)
      return
    }

    setHasVote(true)
  }

  return (
    <div className="flex h-full flex-col gap-6 tablet:flex-row tablet:gap-12">
      {/* DAO Vote */}
      <section className="flex h-full w-[416px] flex-col justify-between gap-10 rounded-[32px] bg-white p-8">
        <div className="space-y-6">
          {/* Options Section */}
          {!hasVote ? (
            <>
              <h1 className="text-2xl font-medium">Options:</h1>
              <div className="flex flex-col gap-3">
                {options.map((option) => {
                  return (
                    <div
                      key={option.option_id}
                      onClick={() => onClickOption(option.option_id)}
                      className={`${isClickedOption === option.option_id ? 'border-primary-green' : 'border-gray-300'} cursor-pointer rounded-[100px] border bg-white py-3 text-center transition duration-300`}
                    >
                      <p className="w-full">{option.option_name}</p>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <h1 className="text-2xl font-medium">Thanks for voting!</h1>
                <p className="text-neutral-30">
                  You have casted all your votes
                </p>
              </div>
              <p>
                Thank you for your vote! Your contribution is helping us make a
                real difference, no matter the cause. We’ll keep you updated on
                the results and how your choice will impact our mission.
                Together, we can drive meaningful change for the environment and
                our communities. Stay tuned for more updates and ways to stay
                involved!
              </p>
            </>
          )}
        </div>

        {/* Vote Section */}
        {isConnected ? (
          <>
            {eligibleVote ? (
              <div className={`${hasVote ? 'hidden' : 'block'}`}>
                <p className="p-4">You have {voteCount} vote left</p>
                <button
                  onClick={() => submitVote(false)}
                  disabled={isSubmitDisabled}
                  className={`w-full rounded-[32px] ${isSubmitDisabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-primary-green'} hover:${isSubmitDisabled ? '' : 'bg-green-900'} py-4`}
                >
                  <span className="text-white">Vote</span>
                </button>
                <button
                  onClick={() => submitVote(true)}
                  className="w-full rounded-[32px] bg-white py-4"
                >
                  <span className="text-primary-green">Remain Neutral</span>
                </button>
              </div>
            ) : (
              <div>
                <p>You must own an Encoteki NFT to vote.</p>
                <Link href="/mint">
                  <span className="text-primary-green">Mint now</span>
                </Link>
              </div>
            )}
          </>
        ) : (
          <p>
            Connect wallet to vote.{' '}
            <span
              onClick={openConnectModal}
              className="cursor-pointer text-primary-green"
            >
              Connect wallet
            </span>
          </p>
        )}
      </section>

      {/* // DAO Article */}
      <article className="w-[calc(912px-426px)]">
        {daoDetail.dao_type === DaoType.proposal ? (
          <p className="text-justify">{daoDetail.dao_content}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: daoDetail.dao_content }} />
        )}
      </article>
    </div>
  )
}
