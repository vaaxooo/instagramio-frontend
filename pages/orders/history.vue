<template>
	<div class="row">
		<div class="col-md-12">
			<div class="order-block">
				<div class="block-header">История заказов</div>
				<div class="block-content">
					<table class="table table-striped table-sm">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Услуга</th>
								<th scope="col">Цена</th>
								<th scope="col">Количество</th>
								<th scope="col">Ссылка</th>
								<th scope="col">Время</th>
								<th scope="col">Статус</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="order of orders" :key="order.id">
								<td>#{{ order.order_id }}</td>
								<td>{{ order.service_id }}</td>
								<td>{{ order.price }} $</td>
								<td>{{ order.quantity }}</td>
								<td>{{ order.url }}</td>
								<td>{{ moment(order.createdAt).calendar() }}</td>
								<td>{{ order.status }}</td>
								<td>
									<button class="btn btn-sm btn-danger" @click="cancelOrder(order.order_id)" v-if="order.status === 'pending'">Х</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/ru';

export default {
	auth: true,
	data() {
		return {
			orders: [],
			moment: moment
		}
	},
	async fetch() {
		await this.getOrders();
	},
	methods: {
		async getOrders() {
			const response = (await this.$axios.get("/orders/all")).data;
			if(response.status){
				this.orders = response.data;
			}
		},

		async cancelOrder(order_id) {
			const response = (await this.$axios.get("/orders/" + order_id + "/cancel")).data;
			if(response.status){
				await this.getOrders();
				this.$toast.success(response.message);
			} else {
				this.$toast.error(response.message);
			}
		}
	}
}
</script>
