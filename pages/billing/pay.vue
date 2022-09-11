<template>
	<div class="row">
		<div class="col-md-5">
			<div class="order-block">
				<div class="block-header">Пополнение баланса</div>
				<div class="block-content">
					<div class="form-group">
						<label for="amount">Сумма пополнения (Доллары)</label>
						<input type="text" class="form-control" id="amount" placeholder="Укажите сумму в долларах" v-model="amount">
					</div>

					<div class="form-group">
						<label for="type">Способ оплаты</label>
						<select class="form-select" id="type" v-model="type">
							<option value="card" selected>Visa / MasterCard</option>
						</select>
					</div>

					<div class="form-group mt-3">
						<button type="button" class="btn btn-orange px-5" @click="pay">Перейти к оплате</button>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-7 px-5 mt-4 mb-3">
			<div class="info mt-3">
				<div class="info">- Пополнить баланс можно только через сайт.</div>
				<div class="info">- Информация о всех платежах на странице биллинга.</div>
				<div class="info">- Выполняя оплату, вы соглашаетесь с <a href="/terms">условиями использования</a> сервиса</div>
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
									<td>{{ item.type }}</td>
									<td>{{ item.status }}</td>
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
			type: 'card',
			
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
			const response = (await this.$axios.post('/transactions/create', {
				amount: this.amount,
				type: this.type
			})).data

			if(response.status) {
				this.sendData(response.data)
			} else {
				this.$toast.error(response.message)
			}
		},

		sendData(data) {
			let form = document.createElement('form')
			form.action = 'https://api.fondy.eu/api/checkout/redirect/'
			form.method = 'POST'
			form.style.display = 'none'
			for (let key in data) {
				let input = document.createElement('input')
				input.type = 'hidden'
				input.name = key
				input.value = data[key]
				form.appendChild(input)
			}
			document.body.appendChild(form)
			form.submit()
		}
	}
}
</script>