<template>
	<div class="row">
		<div class="col-md-5">
			<div class="order-block">
				<div class="block-header">Регистрация</div>
				<div class="block-content">
					<div class="form-group">
						<label for="email">E-mail</label>
						<input type="email" class="form-control" id="email" placeholder="Укажите e-mail" v-model="email" :class="{'is-invalid': errors.email}">
						<span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
					</div>

					<div class="form-group">
						<label for="password">Пароль</label>
						<input type="password" class="form-control" id="password" placeholder="Придумайте пароль" v-model="password" :class="{'is-invalid': errors.password}">
						<span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
					</div>

					<div class="form-group" v-if="!loading">
						<button type="submit" class="btn btn-orange px-5" @click="register">Зарегистрироваться</button>
						<a href="/auth/login" class="btn btn-light px-5">Вход</a>
					</div>
				</div>

			</div>
		</div>



		<div class="col-md-7 px-5 mt-4 mb-3">
			<div class="info mt-3">Регистрация не займёт много времени =)</div>
		</div>


	</div>
</template>

<script>
export default {
	auth: false,
	data() {
		return {
			email: '',
			password: '',
			errors: [],
			loading: false
		}
	},
	methods: {
		async register() {
			this.message = '';
			this.errors = {};
			this.loading = true;
			const response = (await this.$axios.post('/auth/register', {
				email: this.email,
				password: this.password
				})).data;
			if(response.status) {
				this.$toast.success(response.message);
				this.errors = {}
				this.email = '';
				this.password = '';
			} else {
				this.errors = response.errors;
			}
			this.loading = false;
		},
	}
}
</script>