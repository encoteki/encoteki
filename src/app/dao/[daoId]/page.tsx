/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import {
  DAOResponse,
  OptionsResponse,
  ProposalDto,
  SubmitVoteDto,
} from '@/types/dao'
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs'
import DaoBadge from '@/components/badge/daoBadge'
import calculateDayDifference from '@/utils/calculateDayDifference'
import Footer from '@/components/footer'
import Loading from '@/app/loading'
import { getDaoById } from '@/utils/supabase/dao/getDaobyId'
import { getDaoOptions } from '@/utils/supabase/dao/getDaoOptions'
import { submitDAO } from '@/utils/supabase/dao/submitDAO'
// import Link from 'next/link'
import { DaoType } from '@/enums/daoType'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract } from 'wagmi'
import { getUsedNFTId } from '@/utils/supabase/dao/getUsedNFTId'

import contractConfig from '@/config/contract-config'
import { Accordion, AccordionItem } from '@heroui/react'
import { Link } from '@heroui/link'
import { Input } from '@heroui/input'
import { getProposal } from '@/utils/supabase/dao/getProposal'
import DefaultButton from '@/components/button/defaultButton'

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
    proposal_id: 0,
    scoring: '',
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

  // Get nft id of address wallet
  const { data, isSuccess } = useReadContract({
    ...contractConfig,
    functionName: 'walletOfOwner',
    args: [address ?? '0x1c3294B823cF9ac62940c64E16bce6ebAf7dca5B'],
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
      const walletOfOwner = data.map((id) => Number(id))

      // Get data of NFT Id that has vote
      const usedNFTId = await getUsedNFTId(
        Number(daoId),
        walletOfOwner,
        chainId as number,
      )

      if (Array.isArray(usedNFTId)) {
        const usedNfts = usedNFTId.map((nft) => String(nft.nft_id))
        const unusedNfts = walletOfOwner.filter(
          (item) => !usedNfts.includes(String(item)),
        )

        setAvailableNFTIds(unusedNfts)
        setVoteCount(unusedNfts.length)
        setEligibleVote(walletOfOwner.length > 0)
      } else {
        console.error('Data is not an array or is undefined.')
      }
    }

    const initDAO = async () => {
      try {
        const { daoId } = await params
        await fetchData(daoId)
        if (dao.dao_type !== 3) {
          await getAvailableVote(daoId)
        }
      } catch (error) {
        console.error('Init DAO failed:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    initDAO()
  }, [params, isConnected, isSuccess, data, chainId, dao.dao_type])

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
          {/* Header */}
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

          <div className="flex flex-col gap-6 tablet:flex-row tablet:gap-12">
            {dao.dao_type === DaoType.business ? (
              <BusinessDetails
                proposalId={dao.proposal_id}
                scoring={dao.scoring}
              />
            ) : (
              <>
                {' '}
                {/* Options Section */}
                <section className="flex h-auto w-full flex-col justify-between gap-6 rounded-[32px] bg-white p-6 tablet:w-1/2 tablet:p-8">
                  {!hasVote ? (
                    <>
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
                              <p className="px-4">
                                You have {voteCount} vote left
                              </p>
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
                                <span className="text-primary-green">
                                  Mint now
                                </span>
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
                        <h1 className="text-2xl font-medium">
                          Thanks for voting!
                        </h1>
                        <p className="text-neutral-30">
                          You have casted all your votes
                        </p>
                      </div>
                      <p>
                        Thank you for your vote! Your contribution is helping us
                        make a real difference, no matter the cause. We’ll keep
                        you updated on the results and how your choice will
                        impact our mission. Together, we can drive meaningful
                        change for the environment and our communities. Stay
                        tuned for more updates and ways to stay involved!
                      </p>
                    </>
                  )}
                </section>
                {/* // DAO Article */}
                <article className="w-full tablet:w-1/2">
                  {dao.dao_type === DaoType.proposal ? (
                    <p className="text-justify">{dao.dao_content}</p>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: dao.dao_content }}
                    />
                  )}
                </article>
              </>
            )}
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}

function BusinessDetails({
  proposalId,
  scoring,
}: {
  proposalId: number
  scoring: string
}) {
  const [proposal, setProposal] = useState<ProposalDto>({
    name: '',
    description: '',
    business_model: '',
    market_opportunity: '',
    competitive_adv: '',
    management_team: '',
    team_cv: '',
    pitch_deck: '',
    amount: 0,
    allocation: 0,
  })
  const [score, setScore] = useState<number[]>([])

  useEffect(() => {
    const init = async () => {
      try {
        const data: ProposalDto = await getProposal(proposalId)
        setProposal(data)

        const parsedScoring = JSON.parse(scoring)
        console.dir(parsedScoring)
        if (Array.isArray(parsedScoring)) {
          const scores = parsedScoring.map((item: any) => item.scoring)
          setScore(scores)
        }
      } catch (error) {
        console.error('Initialization error:', error)
      }
    }

    init()
  }, [proposalId, scoring])

  return (
    <div className="flex w-full flex-col gap-4">
      <article className="p-2">
        <h2 className="text-xl font-semibold">Business Details</h2>
        <p className="text-neutral-30">{proposal.description}</p>
      </article>
      <div className="flex gap-4">
        <Link
          isBlock
          showAnchorIcon
          className="text-primary-green"
          href={proposal.team_cv}
        >
          Team CV
        </Link>
        <Link
          isBlock
          showAnchorIcon
          className="text-primary-green"
          href={proposal.pitch_deck}
        >
          Pitch Deck
        </Link>
      </div>

      <Accordion fullWidth>
        <AccordionItem
          key="1"
          aria-label="Business Model"
          title={
            <>
              Business Model{' '}
              <span className="font-semibold text-primary-green">
                {score[0]}
              </span>
            </>
          }
        >
          {proposal.business_model}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Market Opportunity"
          title={
            <>
              Market Opportunity{' '}
              <span className="font-semibold text-primary-green">
                {score[1]}
              </span>
            </>
          }
        >
          {proposal.market_opportunity}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Competitive Advantage"
          title={
            <>
              Competitive Advantage{' '}
              <span className="font-semibold text-primary-green">
                {score[2]}
              </span>
            </>
          }
        >
          {proposal.competitive_adv}
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Management Team"
          title={
            <>
              Management Team{' '}
              <span className="font-semibold text-primary-green">
                {score[3]}
              </span>
            </>
          }
        >
          {proposal.management_team}
        </AccordionItem>
      </Accordion>

      <p className="p-2 font-semibold text-neutral-30">
        Amount requested IDRX {proposal.amount} is {proposal.allocation}% of
        total allocation.
      </p>
      <div className="flex gap-4">
        <Input
          isRequired
          name="fund"
          endContent={
            <div className="flex items-center">
              <label className="sr-only text-xl" htmlFor="currency">
                Currency
              </label>
              <select
                className="border-0 bg-transparent text-small text-default-400 outline-none"
                id="currency"
                name="currency"
              >
                <option>IDRX</option>
              </select>
            </div>
          }
          className=""
          label="Funding"
          labelPlacement="inside"
          size="lg"
          type="number"
        />
      </div>

      <DefaultButton wording={'Submit Fund'} isPrimary={true} className="p-3" />
    </div>
  )
}
