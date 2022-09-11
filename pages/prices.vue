<template>
	<div class="row">
		<div class="col-md-12">
			<div class="order-block">
				<div class="block-header">Список услуг и цены</div>
				<table class="table table-striped table-sm">
					<thead>
						<tr>
						<th scope="col">#</th>
						<th scope="col">Название</th>
						<th scope="col">Описание</th>
						<th scope="col">Мин. - макс. заказ</th>
						<th scope="col">Стоимость (за 1000)</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="service of services" :key="service.id">
							<td>#{{ service.service_id }}</td>
							<td>{{ service.name }}</td>
							<td>{{ service.description }}</td>
							<td>{{ service.min_order + " - " + service.max_order }}</td>
							<td>{{ (+service.price).toFixed(2) }} $</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	auth: false,
	data() {
		return {
			services: []
		}
	},
	async fetch() {
		await this.getServices()
	},
	methods: {
		async getServices() {
			const response = (await this.$axios.get('/services/all')).data
			if(response.status) {
				this.services = response.data
			}
		}
	}

}
</script>
