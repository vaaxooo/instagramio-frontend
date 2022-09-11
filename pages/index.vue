<template>
	<div class="row">
            <div class="col-md-5">
                <div class="order-block">
                    <div class="block-header">Оформление заказа</div>
                    <div class="block-content">
                        <div class="form-group">
                            <label for="service">Категория</label>
                            <select class="form-select" id="service" @change="changeCategory" v-model="category">
								<option value="0" selected>Выберите категорию</option>
								<option value="followers">Подписчики</option>
								<option value="likes">Лайки</option>
								<option value="views">Просмотры</option>
								<option value="comments">Комментарии</option>
								<option value="views">Статистика</option>
							</select>
                        </div>
                        <div class="form-group">
                            <label for="service">Вид накрутки <small>(Указана стоимость за 1000)</small></label>
                            <select class="form-select" id="service" v-model="service">
                                <option value="0" selected>Выберите вид накрутки</option>
                                <option v-for="service of services" :key="service.id" :value="service.service_id">#{{ service.service_id }} {{ service.name }} - {{ (+service.price).toFixed(2) }} $</option>
							</select>
                        </div>
                        <div class="form-group">
                            <label for="url">Ссылка</label>
                            <input type="text" class="form-control" id="url" placeholder="Укажите ссылку" v-model="url">
                        </div>
                        <div class="form-group">
                            <label for="quantity">Количество</label>
                            <input type="number" class="form-control" id="quantity" placeholder="Укажите количество" v-model="quantity">
                            <span class="text-danger" v-if="errors.min_order">{{ errors.min_order }}</span>
                            <span class="text-danger" v-if="errors.max_order">{{ errors.max_order }}</span>
                        </div>
                        <div class="form-group">
                            <label>Сумма к оплате: </label>
                            <span class="order-sum">{{ sum }} $</span>
                        </div>

                        <div class="form-group" v-if="!$auth.user">
                            <span class="text-danger">Для заказа требуется быть авторизованным!</span>
                        </div>

                        <div class="form-group" v-else>
                            <button type="button" class="btn btn-orange px-5" @click="order">Заказать</button>
                        </div>
                    </div>

                </div>
            </div>



            <div class="col-md-7 px-5 mt-4 mb-3 mobile-width">
                <div class="block-header">Описание выбранной услуги:</div>
                <div class="info">Минимальный заказ: {{ min_order }}</div>
                <div class="info">Максимальный заказ: {{ max_order }}</div>
                <div class="info mt-3">{{ temp_description}}</div>
            </div>


        </div>
</template>

<script>
export default {
	auth: false,
    data() {
        return {
            category: 0,
            services: [],
            service: 0,
            url: null,
            quantity: null,
            sum: 0.00,


            temp_description: "Выберите категорию и вид накрутки",
            min_order: 0,
            max_order: 0,

            errors: []
        }
    },
    watch: {
        async 'service'(newValue, oldValue) {
            if (this.service) {
                this.services.filter((item) => {
                    console.log(item.service_id, this.service)
                    if (item.service_id == this.service) {
                        this.min_order = item.min_order
                        this.max_order = item.max_order
                        this.temp_description = item.description
                    }
                })
            }
        },

        async 'quantity'(newValue, oldValue) {
            if (this.service) {

                if(this.quantity < this.min_order) {
                    this.errors.min_order = `Минимальный заказ ${this.min_order}`
                } else {
                    this.errors.min_order = null
                }

                if(this.quantity > this.max_order) {
                    this.errors.max_order = `Максимальный заказ ${this.max_order}`
                } else {
                    this.errors.max_order = null
                }

                this.services.filter((item) => {
                    if (item.service_id == this.service) {
                        this.sum = (+item.price * (+this.quantity / 1000))
                    }
                })
            }
        }
    },
    methods: {

        changeCategory(event) {
            this.category = event.target.value;
            this.getServices();
        },

        async getServices() {
            const response = (await this.$axios.get('/services/by-category/' + this.category)).data
            if(response.status) {
                this.services = response.data
            }
        },

        async order() {
            const response = (await this.$axios.post('/orders/create', {
                category: this.category,
                service_id: this.service,
                url: this.url,
                quantity: this.quantity
            })).data
            if(response.status) {
                this.$toast.success(response.message)
            } else {
                this.$toast.error(response.message)
            }
        }
    },
}
</script>