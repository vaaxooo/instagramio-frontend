<template>
	<div class="row">
		<div class="col-md-5">
			<div class="order-block">
				<div class="block-header">Вход в личный кабинет</div>
				<div class="block-content">
					<div class="form-group">
						<label for="quantity">E-mail</label>
						<input type="email" class="form-control" id="quantity" placeholder="Введите e-mail" v-model="email" :class="{'is-invalid': errors.email}">
						<span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
					</div>

					<div class="form-group">
						<label for="quantity">Пароль</label>
						<input type="password" class="form-control" id="quantity" placeholder="Введите пароль" v-model="password" :class="{'is-invalid': errors.password}">
						<span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
					</div>

					<div class="form-group" v-if="!loading">
						<button type="submit" class="btn btn-orange px-5" @click="login">Войти</button>
						<a href="/auth/register" class="btn btn-light px-5">Регистрация</a>
					</div>
				</div>

			</div>
		</div>



		<div class="col-md-7 px-5 mt-4 mb-3">
			<div class="info mt-3">Авторизовавшись, вы получаете доступ к заказу услуг.</div>
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
		async login() {
			this.message = '';
            this.errors = {};
            this.loading = true;
            let response = (await this.$auth.loginWith('local', {
                data: {
                    email: this.email,
                    password: this.password
                }
            })).data;
            this.loading = false;
            if(!response.status) {
                if(response.errors) {
                    this.errors = response.errors
                } else {
					this.$toast.error(response.message)
                }
                return false;
            }
            await this.$auth.setUserToken(response.data.access_token);
            await this.$auth.setUser(response.data.user);
			window.location = '/';
		}
	}
}
</script>