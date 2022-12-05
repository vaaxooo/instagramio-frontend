<template>
	<div class="header">
        <header class="p-3 text-bg-white mx-0">
            <div class="container mx-0 px-0">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start mx-0 mobile-header">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 mx-0 text-dark text-decoration-none logo">
                        <b class="mx-2">INSTABOOST</b>
                    </a>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-start mb-md-0 mx-5">
                        <li><a href="/" class="nav-link px-2 text-dark">Накрутить</a></li>
                        <li><a href="/prices" class="nav-link px-2 text-dark">Цены</a></li>
                        <li><a href="https://t.me/vaaxooo" class="nav-link px-2 text-dark" target="_blank">Тех. поддержка</a></li>
                    </ul>

                    <div class="text-end" v-if="!$auth.user">
                        <a href="/auth/login" class="btn btn-text me-2">Вход</a>
                        <a href="/auth/register" class="btn btn-dark">Регистрация</a>
                    </div>

                    <div class="text-end" v-else>
                        <a href="/billing/pay" class="btn btn-text">{{ "Баланс " + (+$auth.user.balance).toFixed(2) + " $" }}</a>
                        <a href="/orders/history" class="btn btn-text">История заказов</a>
                        <a href="/settings" class="btn btn-text">Настройки</a>
                        <a href="#" class="btn btn-text" @click="logout">Выйти</a>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    async fetch() {
        console.log(this.$auth);
    },
    methods: {
        async logout() {
			await this.$auth.logout();
		}
    }
}
</script>