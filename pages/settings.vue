<template>
	<div class="row">
		<div class="col-md-6">
			<div class="order-block">
				<div class="row">
					<div class="col-md-12">
						<div class="block-header">Настройки личного кабинета</div>
						<div class="form-group">
							<label for="email">E-mail</label>
							<input type="text" class="form-control" id="email" disabled :value="$auth.user.email">
						</div>

						<div class="form-group mt-5">
							<label for="current_password">Текущий пароль</label>
							<input type="text" class="form-control" id="current_password" v-model="current_password" placeholder="Укажите текущий пароль" :class="{'is-invalid': errors.current_password}">
							<span class="text-danger" v-if="errors.current_password">{{ errors.current_password[0] }}</span>
						</div>

						<div class="form-group">
							<label for="new_password">Новый пароль</label>
							<input type="text" class="form-control" id="new_password" v-model="new_password" placeholder="Придумайте новый пароль" :class="{'is-invalid': errors.password}">
							<span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
						</div>

						<div class="form-group">
							<button type="submit" class="btn btn-orange" @click="changePassword">Изменить пароль</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	auth: true,
	data() {
		return {
			current_password: '',
			new_password: '',

			errors: []
		}
	},
	methods: {
		async changePassword() {
			this.errors = [];
			const response = (await this.$axios.patch('/account/password/change', {
				current_password: this.current_password,
				password: this.new_password,
			})).data;
			if(response.status) {
				this.$toast.success(response.message);
				this.current_password = '';
				this.new_password = '';
			} else {
				if(response.errors) {
					this.errors = response.errors;
				} else {
					this.$toast.error(response.message);
				}
			}
		}
	}
}
</script>
