import { useRef, useState } from 'react'
import useSendbirdStateContext from '@sendbird/uikit-react/useSendbirdStateContext'
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors'
import {
	USER_ID,
	SALESFORCE_SUPPORT_CHAT_CHANNEL,
	CHANNEL_COVER_IMAGE,
} from '../consts'
import { getRandomChannelName } from '../utils'

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
						await createGroupChannel({
							customType: SALESFORCE_SUPPORT_CHAT_CHANNEL,
							invitedUserIds: [USER_ID],
							name: title,
							coverUrl: CHANNEL_COVER_IMAGE,
						})
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
