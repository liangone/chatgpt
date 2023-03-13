import axios from 'axios';

// 创建实例
const request = axios.create({
	baseURL: 'https://api.openai.com/v1/chat/completions',
	timeout: 50000,
	headers: {
		'content-Type': 'application/json',
		'Authorization': `Bearer ${your_API_Key}` // 替换成你的API Key
	}
});

// 调用ChatGPT模型的API方法
export function generateResponse (params) {
	return request.post('', {
		messages: params,
		model: 'gpt-3.5-turbo',
	});
};