/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import { DAOResponse, OptionsResponse, SubmitVoteDto } from '@/types/dao'
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs'
import DaoBadge from '@/components/badge/daoBadge'
import calculateDayDifference from '@/utils/calculateDayDifference'
import Footer from '@/components/footer'
import Loading from '@/app/loading'
import { getDaoById } from '@/utils/supabase/dao/getDaobyId'
import { getDaoOptions } from '@/utils/supabase/dao/getDaoOptions'
import { submitDAO } from '@/utils/supabase/dao/submitDAO'
import Link from 'next/link'
import { DaoType } from '@/enums/daoType'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { getUsedNFTId } from '@/utils/supabase/dao/getUsedNFTId'

import contractConfig from '@/config/contract-config'
import { useWalletOfOwner } from '@/hooks/useWalletOfOwner'

type Params = Promise<{ daoId: string }>

export default function DAODetailPage({ params }: { params: Params }) {
  const [loading, setLoading] = useState(true)

  const [dao, setDao] = useState<DAOResponse>({
    dao_id: 0,
    dao_name: '',
    dao_content: '',
    dao_type: 0,
    start_date: '',
    end_date: '',
  })
  const [options, setOptions] = useState<OptionsResponse[]>([])

  // Connect Wallet Modal
  const { openConnectModal } = useConnectModal()
  const { isConnected, address, chainId } = useAccount()

  // Count of vote
  const [voteCount, setVoteCount] = useState<number>(0)
  // Available NFT Ids to vote
  const [availableNFTIds, setAvailableNFTIds] = useState<Array<any>>([])
  // Eligible of vote
  const [eligibleVote, setEligibleVote] = useState<boolean>(true)
  // Status of vote
  const [hasVote, setHasVote] = useState<boolean>(false)

  const breadcrumbs = [
    {
      index: 1,
      page: 'Home',
      link: '/',
    },
    {
      index: 2,
      page: 'DAO',
      link: '/dao',
    },
    {
      index: 3,
      page: dao.dao_name,
      link: `/dao/${dao.dao_id}`,
    },
  ]

  const { data: walletTokens, isSuccess } = useWalletOfOwner({
    contractConfig,
    address: address ?? '0x00',
  })

  useEffect(() => {
    const fetchData = async (daoId: string) => {
      const [daoData, optionsData] = (await Promise.all([
        getDaoById(Number(daoId)),
        getDaoOptions(Number(daoId)),
      ])) as [DAOResponse, OptionsResponse[]]

      document.title = daoData.dao_name
      setDao(daoData)
      setOptions(optionsData)
    }

    const getAvailableVote = async (daoId: string) => {
      if (!isConnected || !isSuccess) return

      // Convert BigInt array to number array
      const walletOfOwner = Array.isArray(walletTokens)
        ? walletTokens.map((id) => Number(id))
        : []

      console.dir(walletOfOwner)

      // Get data of NFT Id that has vote
      const usedNFTId = await getUsedNFTId(
        Number(daoId),
        walletOfOwner,
        chainId as number,
      )

      console.log(usedNFTId)

      if (Array.isArray(usedNFTId)) {
        const usedNfts = usedNFTId.map((nft) => String(nft.nft_id))
        const unusedNfts = walletOfOwner.filter(
          (item) => !usedNfts.includes(String(item)),
        )

        setAvailableNFTIds(unusedNfts)
        setVoteCount(unusedNfts.length)
        setEligibleVote(walletOfOwner.length > 0)
        console.dir(unusedNfts)
      } else {
        console.error('Data is not an array or is undefined.')
      }
    }

    const initDAO = async () => {
      try {
        const { daoId } = await params
        await fetchData(daoId)
        await getAvailableVote(daoId)
      } catch (error) {
        console.error('Init DAO failed:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    initDAO()
  }, [params, isConnected, isSuccess, walletTokens, chainId])

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
        chain_id: chainId,
        nft_id: Number(availableNFTIds[0]),
        dao_id: dao.dao_id,
        option_id: undefined,
        isNeutral: true,
      }
    } else {
      req = {
        chain_id: chainId,
        nft_id: Number(availableNFTIds[0]),
        dao_id: dao.dao_id,
        option_id: isClickedOption,
        isNeutral: false,
      }
    }
    const hasVote: boolean = await submitDAO(req)
    setHasVote(hasVote)
  }

  return (
    <>
      <Navbar />

      {/* DAO Detail */}
      {loading ? (
        <Loading />
      ) : (
        <main className="mx-auto my-16 w-[calc(100%-32px)] max-w-[912px] space-y-12 tablet:my-32">
          <header className="space-y-8">
            <Breadcrumb items={breadcrumbs} />
            <div className="space-y-2">
              <DaoBadge daoType={dao.dao_type} />
              <h1 className="text-3xl font-medium tablet:text-5xl">
                {dao.dao_name}
              </h1>
              <div className="flex justify-between text-sm tablet:text-base">
                <p>
                  Voting ends in {calculateDayDifference(dao.end_date)}
                  {calculateDayDifference(dao.end_date) > 1 ? ' days' : ' day'}
                </p>
                <p className="text-neutral-40">
                  Created{' '}
                  {calculateDayDifference(dao.start_date) > 0
                    ? calculateDayDifference(dao.start_date)
                    : ''}
                  {calculateDayDifference(dao.start_date) > 0
                    ? ' days ago'
                    : ' today'}
                </p>
              </div>
            </div>
          </header>

          <div className="flex h-full flex-col gap-6 tablet:flex-row tablet:gap-12">
            <section className="flex h-full w-[416px] flex-col justify-between gap-6 rounded-[32px] bg-white p-8">
              {!hasVote ? (
                <>
                  {/* Options Section */}
                  <div className="space-y-6">
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
                  </div>

                  {isConnected ? (
                    <>
                      {eligibleVote ? (
                        <>
                          <p className="px-4">You have {voteCount} vote left</p>
                          <div
                            className={`space-y-3 ${voteCount > 0 ? 'block' : 'hidden'}`}
                          >
                            <button
                              onClick={() => submitVote(false)}
                              disabled={isSubmitDisabled}
                              className={`w-full rounded-[32px] ${isSubmitDisabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-primary-green'} hover:${isSubmitDisabled ? '' : 'bg-green-900'} py-4`}
                            >
                              <span className="text-white">Vote</span>
                            </button>
                            <button
                              onClick={() => submitVote(true)}
                              className="w-full rounded-[32px] border border-primary-green bg-white py-4"
                            >
                              <span className="text-primary-green">
                                Remain Neutral
                              </span>
                            </button>
                          </div>
                        </>
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
                    Thank you for your vote! Your contribution is helping us
                    make a real difference, no matter the cause. We’ll keep you
                    updated on the results and how your choice will impact our
                    mission. Together, we can drive meaningful change for the
                    environment and our communities. Stay tuned for more updates
                    and ways to stay involved!
                  </p>
                </>
              )}
            </section>

            {/* // DAO Article */}
            <article className="w-[calc(912px-426px)]">
              {dao.dao_type === DaoType.proposal ? (
                <p className="text-justify">{dao.dao_content}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: dao.dao_content }} />
              )}
            </article>
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}
