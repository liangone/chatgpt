<template>
	<div class="chatgpt">
		<div class="chatgpt__messages">
			<div v-for="(message, index) in messages" :key="index" class="chatgpt__message">
				<div class="chatgpt__message-content">{{ message.content }}</div>
				<div class="chatgpt__message-time">{{ message.time }}</div>
			</div>
		</div>
		<form class="chatgpt__form" @submit.prevent="sendMessage">
			<input v-model="inputValue" type="text" placeholder="请输入聊天内容" />
			<button type="submit">发送</button>
		</form>
	</div>
</template>

<script>
import { generateResponse } from '../http/request';

export default {
	name: 'demo',
	data() {
		return {
			messages: [], // 聊天记录
			inputValue: '' // 输入框的值
		};
	},
	methods: {
		async sendMessage() {
			this.messages.push({
				role: "user",
				content: this.inputValue,
			});
			// 发送聊天请求
			const response = await generateResponse(this.messages)

			// 将聊天记录添加到messages数组中
			this.messages.push({
				role: "user",
				content: response.data.choices[0].message.content.trim(),
			});

			// 清空输入框
			this.inputValue = '';
		}
	}
};
</script>

<style scoped>
.chatgpt {
	display: flex;
	flex-direction: column;
	height: 500px;
	width: 400px;
	border: 1px solid #ccc;
	border-radius: 5px;
	overflow: hidden;
}

.chatgpt__messages {
	flex: 1;
	padding: 10px;
	overflow-y: auto;
}

.chatgpt__message {
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

.chatgpt__message-content {
	background-color: #eee;
	padding: 5px;
	border-radius: 5px;
}

.chatgpt__message-time {
	font-size: 12px;
	color: #999;
	text-align: right;
}

.chatgpt__form {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: #f5f5f5;
}

.chatgpt__form input {
	flex: 1;
	height: 30px;
	border-radius: 5px;
	border: none;
	padding: 5px;
	font-size: 14px;
	outline: none;
}

.chatgpt__form button {
	height: 30px;
	padding: 0 10px;
	border-radius: 5px;
	border: none;
	background-color: #007aff;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
</style>