import { useState } from 'react'
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider'
import ChannelList from '@sendbird/uikit-react/ChannelList'
import Channel from '@sendbird/uikit-react/Channel'
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings'

import '@sendbird/uikit-react/dist/index.css'
import './App.css'

import ChannelListHeader from './ChannelListHeader'
import { APP_ID, NICKNAME } from '../consts'

function App() {
	const [channelUrl, setChannelUrl] = useState<string>('')
	const [showSetting, setShowSetting] = useState<boolean>(false)
	return (
		<SendbirdProvider
			appId={APP_ID}
			userId={'test-user'}
			nickname={NICKNAME}
			isVoiceMessageEnabled={false}
		>
			<div className='sendbird-support-chat'>
				<div className='sendbird-support-chat__channel-list'>
					<ChannelList
						onChannelSelect={(channel) => setChannelUrl(channel?.url)}
						renderHeader={ChannelListHeader}
						isTypingIndicatorEnabled
					/>
				</div>
				<div className='sendbird-support-chat__channel'>
					<Channel
						channelUrl={channelUrl}
						onChatHeaderActionClick={() => setShowSetting(!showSetting)}
					/>
				</div>
				{showSetting && (
					<div className='sendbird-support-chat__settings'>
						<ChannelSettings
							channelUrl={channelUrl}
							onCloseClick={() => setShowSetting(false)}
						/>
					</div>
				)}
			</div>
		</SendbirdProvider>
	)
}

export default App
