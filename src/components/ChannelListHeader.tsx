import { useRef, useState } from 'react'

import useSendbirdStateContext from '@sendbird/uikit-react/useSendbirdStateContext'
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors'
import {
	SALESFORCE_API_URL,
	USER_ID,
	SALESFORCE_SUPPORT_CHAT_CHANNEL,
	CHANNEL_COVER_IMAGE,
	SALESFORCE_CLIENT_ID,
	SALESFORCE_CLIENT_SECRET,
} from '../consts'
import { getRandomChannelName } from '../utils'
import axios from 'axios'

export default function ChannelListHeader() {
	const [loading, setLoading] = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)
	const store = useSendbirdStateContext()
	const createGroupChannel = sendbirdSelectors.getCreateGroupChannel(store)
	return (
		<div className='sb-channel-list-header'>
			<div className='sb-channel-list-header__header'>Channels</div>
			<button
				className='sb-channel-list-header__button'
				disabled={loading}
				onClick={async () => {
					try {
						setLoading(true)
						const title = getRandomChannelName()
						const channel = await createGroupChannel({
							customType: SALESFORCE_SUPPORT_CHAT_CHANNEL,
							invitedUserIds: [USER_ID],
							name: title,
							coverUrl: CHANNEL_COVER_IMAGE,
						})
						const auth = await axios.post(
							`${SALESFORCE_API_URL}/services/oauth2/token?grant_type=client_credentials&client_id=${SALESFORCE_CLIENT_ID}&client_secret=${SALESFORCE_CLIENT_SECRET}`,
							{},
							{
								headers: {
									'Referrer-Policy': 'no-referrer',
								},
							}
						)
						await axios.post(
							`${SALESFORCE_API_URL}/services/data/v42.0/sobjects/Case/`,
							{
								Subject: title,
								Description: 'This is a test case',
								Sendbird__UserId__c: 'test-user',
								Sendbird__ChannelUrl__c: channel.url,
								Sendbird__IsEinsteinBotsCase__c: false,
							},
							{
								headers: {
									Accept: 'application/json',
									'Referrer-Policy': 'no-referrer',
									Authorization: `Bearer ${auth.data.access_token}`,
								},
							}
						)
					} catch (error) {
						console.error('Errorsss:', error)
					} finally {
						setLoading(false)
					}
				}}
			>
				Start chat
			</button>
			<img
				className='sb-channel-list-header__hidden_img'
				src='../assets/channel-cover.jpg'
				ref={imgRef}
			/>
		</div>
	)
}
