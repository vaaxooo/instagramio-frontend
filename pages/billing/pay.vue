<template>
	<div class="row">
		<div class="col-md-5">
			<div class="order-block">
				<div class="block-header">Пополнение баланса</div>
				<div class="block-content">
					<div class="form-group">
						<label for="amount">Сумма пополнения</label>
						<input type="text" class="form-control" id="amount" placeholder="Укажите сумму" v-model="amount">
					</div>

					<div class="form-group">
						<label for="type">Способ оплаты</label>
						<select class="form-select" id="type" v-model="type">
							<option value="busd">BUSD</option>
							<option value="usdt" selected>USDT</option>
						</select>
					</div>

					<div class="form-group mt-3">
						<button type="button" class="btn btn-orange px-5" @click="pay">Создать ордер</button>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-7 px-5 mb-3 mobile-width">
			<div class="info mt-3">
				<div class="info text-danger">Пополнение баланса производится на данный момент только через криптовалюту.</div>
				<div class="info">Чтобы пополнить баланс, переведите сумму на указанный кошелёк ниже:</div>
				<div class="info wallet">0x595bDC55247003202C00ac2eCd5E9fc78BE65B8a</div>
				<div class="info">После перевода, в течении 5 минут, средства будут зачислены на ваш баланс.</div>
				<div class="info">Если средства не зачислились, обратитесь в <a href="https://t.me/vaaxooo">тех. поддержку</a>.</div>
				<div class="info"><b class="text-danger fw-bold">Внимание!</b> Данный кошелёк является универсальным и принимает обе валюты (USDT / BUSD)</div>
				<div class="info">Выполняя оплату, вы соглашаетесь с <a href="/terms">условиями использования</a> сервиса</div>
			</div>
		</div>

		<div class="col-md-12 mt-5">
			<div class="order-block">
				<div class="block-header">История платежей</div>
				<div class="block-content">
					<div class="table-responsive">
						<table class="table table-striped">
							<thead>
								<tr>
									<th scope="col">Номер</th>
									<th scope="col">Дата</th>
									<th scope="col">Сумма</th>
									<th scope="col">Способ оплаты</th>
									<th scope="col">Статус</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in transactions" :key="item.id">
									<td>#{{ item.order_id }}</td>
									<td>{{ moment(item.createdAt).calendar() }}</td>
									<td>{{ item.amount }} $</td>
									<td>{{ (item.type).toUpperCase() }}</td>
									<td>{{ item.status === 'pending' ? 'Ожидает оплаты' : 'Зачислено'}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import 'moment/locale/ru';

export default {
	auth: true,
	data() {
		return {
			amount: 0,
			type: 'usdt',
			
			transactions: [],
			moment: moment
		}
	},
	async fetch() {
		await this.getTransactions()
	},
	methods: {
		async getTransactions() {
			const response = (await this.$axios.get('/transactions/get')).data
			if(response.status) {
				this.transactions = response.data
			} else {
				this.$toast.error(response.message)
			}
		},

		async pay() {

			if(this.amount < 10) {
				this.$toast.error('Минимальная сумма пополнения 10$')
				return
			}

			const response = (await this.$axios.post('/transactions/create', {
				amount: this.amount,
				type: this.type
			})).data

			if(response.status) {
				this.transactions.push(response.data)
				this.amount = 0
				this.$toast.success(response.message)
			} else {
				this.$toast.error(response.message)
			}
		},
	}
}
</script>