export interface DAOResponse {
  dao_id: number
  dao_name: string
  dao_content: string
  dao_type: number
  start_date: string
  end_date: string
}

export interface OptionsResponse {
  option_id: number
  option_name: string
  dao_id: number
}

export interface SubmitVoteDto {
  nft_id: number
  dao_id: number
  option_id?: number
  isNeutral: boolean
}
