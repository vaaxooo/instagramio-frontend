<template>
	<div class="row">
		<div class="col-md-5">
			<div class="order-block">
				<div class="block-header">Пополнение баланса</div>
				<div class="block-content">
					<div class="form-group">
						<label for="quantity">Сумма пополнения (Доллары)</label>
						<input type="text" class="form-control" id="quantity" placeholder="Укажите сумму в долларах">
					</div>

					<div class="form-group">
						<label for="quantity">Способ оплаты</label>
						<select class="form-select">
							<option value="card" selected>Visa / MasterCard</option>
						</select>
					</div>

					<div class="form-group mt-3">
						<button type="button" class="btn btn-orange px-5">Перейти к оплате</button>
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
	</div>
</template>

<script>
export default {
	auth: true
}
</script>