<template>
	<div class="chatgpt">
		<el-form ref="form" :model="form" label-width="130px">
			<!-- 本科院校 -->
			<el-form-item label="本科院校" prop="school.value" :rules="[
				{ required: true, message: '本科院校不能为空' },
			]">
				<el-input v-model="form.school.value" placeholder="请输入你的学校全称" />
			</el-form-item>
			<!-- 年级专业 -->
			<el-form-item label="年级专业" prop="gradeMajor.value" :rules="[
				{ required: true, message: '年级专业不能为空' },
			]">
				<el-input v-model="form.gradeMajor.value" placeholder="请输入你的年级和专业，例：大三 信息安全" />
			</el-form-item>
			<!-- 班级排名 -->
			<el-form-item label="班级排名" prop="ranking.value" :rules="[
				{ required: true, message: '班级排名不能为空' },
			]">
				<el-input v-model="form.ranking.value" placeholder="请输入你的班级排名，例：10/150" />
			</el-form-item>
			<!-- 英语六级分数 -->
			<el-form-item label="英语六级分数" prop="englishScore.value" :rules="[
				{ required: true, message: '英语六级分数不能为空' },
				{ type: 'number', message: '英语六级分数必须为数字值' }
			]">
				<el-input v-model.number="form.englishScore.value" placeholder="请输入你的英语六级分数，例：400" />
			</el-form-item>
			<!-- 竞赛经历 -->
			<el-form-item label="竞赛经历">
				<el-input v-model="form.competition.value" placeholder="例：数学建模省一 全国密码技术竞赛国奖 蓝桥杯省一" />
			</el-form-item>
			<!-- 论文发表经历 -->
			<el-form-item label="论文发表经历">
				<el-input v-model="form.thesis.value" placeholder="请输入你的论文发表经历，例：EI会议" />
			</el-form-item>
			<!-- 雅思托福成绩 -->
			<el-form-item label="雅思托福成绩">
				<el-radio-group v-model="form.ielts.value">
					<el-radio label="有" />
					<el-radio label="无" />
				</el-radio-group>
			</el-form-item>
			<!-- 科研经历 -->
			<el-form-item label="科研经历">
				<el-radio-group v-model="form.scientificResearch.value">
					<el-radio label="有" />
					<el-radio label="无" />
				</el-radio-group>
			</el-form-item>
			<!-- 奖学金最高级别 -->
			<el-form-item label="奖学金最高级别">
				<el-select v-model="form.scholarship.value" placeholder="请选择奖学金级别">
					<el-option label="一等奖学金" value="一等奖学金" />
					<el-option label="二等奖学金" value="二等奖学金" />
					<el-option label="三等奖学金" value="三等奖学金" />
				</el-select>
			</el-form-item>
			<!-- 本专业保研名额 -->
			<el-form-item label="本专业保研名额">
				<el-input v-model.number="form.places.value" placeholder="请输入本专业保研名额，例：25" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name:'App',
	data() {
		return {
			// 表单数据
			form: {
				school: {
					key: '本科院校',
					value: ''
				},
				gradeMajor: {
					key: '年级及专业',
					value: ''
				},
				ranking: {
					key: '在班级里排名',
					value: ''
				},
				englishScore: {
					key: '英语六级分数',
					value: ''
				},
				competition: {
					key: '竞赛经历',
					value: ''
				},
				thesis: {
					key: '论文发表经历',
					value: ''
				},
				ielts: {
					key: '雅思托福成绩',
					value: ''
				},
				scientificResearch: {
					key: '科研经历',
					value: ''
				},
				scholarship: {
					key: '获得奖学金最高级别',
					value: ''
				},
				places: {
					key: '本专业保研名额',
					value: ''
				}
			},
			messages: '',	// 问题模板
		};
	},
	methods: {
		// 提交按钮
		onSubmit() {
			//获取所有keys值，并生成预模板
			let temp = Object.keys(this.form).reduce((prev, current) => {
				// 获取表单keys、value
				let formKeys = this.form[`${current}`].key;
				let formVal = this.form[`${current}`].value;
				// 过滤未填的属性
				formVal !== '' && formVal !== '无' ? prev.push(`${formKeys}:${formVal}`) : '';
				return prev;
			}, []).join(';');

			// 生成模板
			this.messages = `有一个大学生，情况是：${temp}。根据上面的信息，输出该学生可以保研到哪些学校？至少 10 所，并按照“争取”、“一般”、“保底”三个层次排序，并给出每个学校的建议。`;

			this.sendMessage();
		},

		// 功能实现
		async sendMessage() {
			// 发送聊天请求
			const response = await axios.post('https://api.openai.com/v1/chat/completions', {
				model: 'gpt-3.5-turbo',
				messages: [{
					role: "user",
					content:this.messages,
				}]
			}, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${your_API_Key}` // 替换成你的API Key
				}
			});

			console.log(response.data.choices[0].message.content.trim());
		}
	}
};
</script>

<style scoped>
.chatgpt {
	display: flex;
	flex-direction: column;
	width: 550px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 50px auto;
}
</style>