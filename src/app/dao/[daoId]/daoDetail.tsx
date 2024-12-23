/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDaoCtx } from '@/context/daoContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAccount } from 'wagmi'
import { DAOResponse, OptionsResponse, SubmitVoteDto } from '@/types/dao'
import { DaoType } from '@/enums/daoType'

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
  const { nftCollection } = useDaoCtx()

  // Wallet
  const { isConnected, address } = useAccount()
  const contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS

  const [voteCount, setVoteCount] = useState<number>(0)
  const [availableNFTIds, setAvailableNFTIds] = useState<Array<any>>([])
  const [isSubmitVote, setIsSubmitVote] = useState<boolean>(false)
  const [isNoVote, setIsNoVote] = useState<boolean>(false)

  useEffect(() => {
    const getHolderCount = async () => {
      if (address) {
        const holderCount: Set<number> = new Set()

        const response = await fetch(
          `https://manta-sepolia.explorer.caldera.xyz/api/v2/addresses/${address}/nft/collections?type=ERC-721%2CERC-404%2CERC-1155`,
        )

        if (response.ok) {
          const data = await response.json()
          if (data && Array.isArray(data.items)) {
            // If NFT on Encoteki > 0
            if (data.items.length > 0) {
              // Filter Encoteki Contract Address
              const filteredItems = data.items.filter(
                (item: any) => item.token.address === contractAddress,
              )

              if (Array.isArray(filteredItems[0].token_instances)) {
                for (const item of [
                  ...filteredItems[0].token_instances,
                ].reverse()) {
                  holderCount.add(item.id)
                  nftCollection.add(item.id)
                }
              }
            }
          } else {
            console.error('Items is not an array or is undefined.')
          }
        }

        return holderCount
      } else {
        console.error('Address is undefined')
      }
    }

    const getAvailableVotes = async (nfts: Set<number>) => {
      const arrayNfts: Array<number> = []
      for (const nft of nfts) {
        arrayNfts.push(nft)
      }

      const usedNfts: Array<any> = []
      let remainVote: number = 0

      const { data, error } = await supabase
        .from('vote_mapping')
        .select('nft_id')
        .eq('dao_id', daoId)
        .in('nft_id', arrayNfts.length > 0 ? arrayNfts : [])

      if (data) {
        remainVote = arrayNfts.length - data.length
      }

      if (error) {
        console.error('Error Get Votes:', error.message)
        return
      }

      if (data && Array.isArray(data)) {
        for (const nft of data) {
          usedNfts.push(String(nft.nft_id))
        }

        const filteredArray = arrayNfts.filter(
          (item) => !usedNfts.includes(item),
        )

        if (filteredArray.length == 0) {
          setIsNoVote(true)
        }

        setAvailableNFTIds(filteredArray)
      } else {
        console.error('data is not an array or is undefined.')
      }

      setVoteCount(remainVote)
    }

    const loadData = async () => {
      if (isConnected) {
        const nfts = await getHolderCount()
        if (nfts) {
          getAvailableVotes(nfts)
        }
      }
    }

    loadData()
  }, [address, isConnected, daoId, contractAddress, nftCollection, supabase])

  // Handle Click Options
  const [isClickedOption, setIsClickedOption] = useState<number>(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const onClickOption = (index: number) => {
    setIsClickedOption(index)
    setIsButtonDisabled(false)
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

    setIsSubmitVote(true)
  }

  return (
    <div className="flex h-full gap-12">
      {/* DAO Left Content */}
      <section className="flex h-full w-[416px] flex-col justify-between gap-10 rounded-[32px] bg-white p-8">
        <div className="space-y-6">
          {isSubmitVote ? (
            <div className="space-y-1">
              <h1 className="text-2xl font-medium">Thanks for voting!</h1>
              <p className="text-neutral-30">You have casted all your votes</p>
            </div>
          ) : (
            <h1 className="text-2xl font-medium">Options:</h1>
          )}

          {!isSubmitVote ? (
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
          ) : (
            <div className="">
              Thank you for your vote! Your contribution is helping us make a
              real difference, no matter the cause. We’ll keep you updated on
              the results and how your choice will impact our mission. Together,
              we can drive meaningful change for the environment and our
              communities. Stay tuned for more updates and ways to stay
              involved!
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <footer className="">
          {isConnected ? (
            <div>
              {nftCollection.size > 0 ? (
                <div>
                  {!isNoVote ? (
                    <div className={`${isSubmitVote ? 'hidden' : 'block'}`}>
                      <p className="p-4">You have {voteCount} vote left</p>
                      <button
                        onClick={() => submitVote(false)}
                        disabled={Boolean(isButtonDisabled)}
                        className={`w-full rounded-[32px] ${isButtonDisabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-primary-green'} hover:${isButtonDisabled ? '' : 'bg-green-900'} py-4`}
                      >
                        <span className="text-white">Vote</span>
                      </button>
                      <button
                        onClick={() => submitVote(true)}
                        className="w-full rounded-[32px] bg-white py-4"
                      >
                        <span className="text-primary-green">
                          Remain Neutral
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div className="">
                  <p>You must own an Encoteki NFT to vote. </p>
                  <Link href="/mint">
                    <span className="text-primary-green">Mint now</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>Connect wallet to vote.</p>
            </div>
          )}
        </footer>
      </section>

      {/* // DAO Right Section */}
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
