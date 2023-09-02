import { model } from './models/itemModel.js';
import { missingEl } from './missingItemTemplate.js';
import { newEl } from './itemTemplate.js';
import { formatter } from './misc.js';


const basketList = document.querySelector('#basketList');
const missingSection = document.querySelector('#missingItems')
const basketListHeader = document.querySelector('.basket__lists');
const sidebar = document.querySelector('.sidebar-wrapper')
const recipientBody = document.querySelector('.recipient-body')

basketList.insertAdjacentHTML('beforeend', newEl);
missingSection.insertAdjacentHTML('beforeend', missingEl)

basketList.addEventListener('click', deleteItem)
basketListHeader.addEventListener('click', isChecked)
sidebar.addEventListener('click', paymentIsChecked)

window.addEventListener('load', sidebarTotalSum)
window.addEventListener('load', sidebarWithoutDiscount)
window.addEventListener('load', sidebarTotalGoods)
window.addEventListener('load', calcDiscount)

function deleteItem(event) {
    if (event.target.dataset.action === 'delete') {
        const parentItem = event.target.closest('#basketItem')
        parentItem.remove()
    }
}

const accordionIcon = document.querySelectorAll('[data-name="accordion"]')

accordionIcon.forEach(
    function (item) {
        item.addEventListener('click', toggleHeaderIcon)
    }
)
//сворочивание элементов
function toggleHeaderIcon(event) {
    if (event.target.dataset.name === 'accordion') {
        this.classList.toggle('header-icon-closed')
        const parentItem = event.target.closest('#listHeader')
        parentItem.nextElementSibling.classList.toggle('hidden-list')

        const allLists = parentItem.closest('.all-lists')
        const underline = allLists.querySelector('.opened-underline')
        const listHeader = allLists.querySelector('.list__header')
        const titleWithCheckbox = listHeader.querySelector('.custom-checkbox')
        const basketList = allLists.querySelector('#basketList')
        const changedTitle = listHeader.querySelector('.basket-list__opened')
        let totalSum = allLists.querySelector('.sum')
        let goods = allLists.querySelector('.total-items')


        if (basketList.classList.contains('hidden-list')) {
            allLists.classList.add('all-lists-closed')
            underline.classList.add('closed-underline')
            titleWithCheckbox.classList.add('none')
            changedTitle.classList.add('basket-list__closed')
            goods.innerText = totalGoods()
            totalSum.innerText = totalBasketSum()
            totalSum.innerText = formatter.format(totalSum.innerText)

        }
        else {
            allLists.classList.remove('all-lists-closed')
            underline.classList.remove('closed-underline')
            changedTitle.classList.remove('basket-list__closed')
            titleWithCheckbox.classList.remove('none')
        }


    }
}

basketList.addEventListener('click', function (event) {
    let counter, price, id, discount
    let sum, sumDiscount = 0

    if (event.target.dataset.action === 'decrement' || event.target.dataset.action === 'increment' || event.target.dataset.action === 'input') {
        const counterBlock = event.target.closest('#counter')
        const priceBlock = event.target.closest('.list-item__price-block')
        price = priceBlock.querySelector('.price-amount')
        discount = priceBlock.querySelector('.discount-price')
        counter = counterBlock.querySelector('#inputCounter')
        id = counterBlock.dataset.id
    }
    if (event.target.dataset.action === 'input') {
        counter.addEventListener('input', function (event) {
            counter = event.target
            if (+counter.value >= +model[id].stock) {
                counter.value = +model[id].stock
            }
            if (+counter.value < 1) {
                counter.value = 1
            }

            const totalPrice = parseInt(counter.value) * parseFloat(model[id].newPrice)
            const discountPrice = parseInt(counter.value) * parseFloat(model[id].oldPrice)
            sum = totalPrice
            price.innerText = formatter.format(sum)
            sumDiscount = discountPrice
            discount.innerText = formatter.format(sumDiscount)
            sidebarTotalSum()
            sidebarWithoutDiscount()
            calcDiscount()
            priceClass(price)
        })



    }
    if (event.target.dataset.action === 'decrement') {
        if (+counter.value > 1) {
            counter.value = --counter.value

            const totalPrice = parseInt(counter.value) * parseFloat(model[id].newPrice)
            sum = totalPrice
            price.innerText = formatter.format(sum)
            const discountPrice = parseInt(counter.value) * parseFloat(model[id].oldPrice)
            sumDiscount = discountPrice
            discount.innerText = formatter.format(sumDiscount)
            sidebarTotalSum()
            sidebarWithoutDiscount()
            priceClass(price)
            calcDiscount()
        }
        if (+counter.value > +model[id].stock) {
            counter.value = +model[id].stock
            counter.value = --counter.value
            //Цена со скидкой
            const totalPrice = parseInt(counter.value) * parseFloat(model[id].newPrice)
            const discountPrice = parseInt(counter.value) * parseFloat(model[id].oldPrice)
            sum = totalPrice
            price.innerText = formatter.format(sum)
            // Цена без скидки
            sumDiscount = discountPrice
            discount.innerText = formatter.format(sumDiscount)
            sidebarTotalSum()
            sidebarWithoutDiscount()
            priceClass(price)
            calcDiscount()

        }

    }


    if (event.target.dataset.action === 'increment') {
        if (counter.value < +model[id].stock) {
            counter.value = ++counter.value
            const discountPrice = parseInt(counter.value) * parseFloat(model[id].oldPrice)
            const totalPrice = parseInt(counter.value) * parseFloat(model[id].newPrice)
            sum = totalPrice
            price.innerText = formatter.format(sum)

            sumDiscount = discountPrice
            discount.innerText = formatter.format(sumDiscount)
            sidebarTotalSum()
            sidebarWithoutDiscount()
            priceClass(price)
            calcDiscount()

        }

    }
})

function totalBasketSum() {
    const price = document.querySelectorAll('.price-amount')
    let totalSum = 0
    let checkbox, currentItem
    price.forEach(function (item) {
        currentItem = item.closest('#basketItem')
        checkbox = currentItem.querySelector('#select-one')
        if (checkbox.checked) {
            totalSum += (parseInt((item.innerText).replace(/\D/g, '')))
        }
    })
    return totalSum
}
function totalWithoutDiscount() {
    const discount = document.querySelectorAll('.discount-price')
    let totalDiscount = 0
    let checkbox, currentItem
    discount.forEach(function (item) {
        currentItem = item.closest('#basketItem')
        checkbox = currentItem.querySelector('#select-one')
        if (checkbox.checked) {
            totalDiscount += (parseInt((item.innerText).replace(/\D/g, '')))
        }
    })
    return totalDiscount
}

function totalGoods() {
    const goods = document.querySelectorAll('#inputCounter')
    let totalGoods = 0
    let checkbox, currentItem
    goods.forEach(function (item) {
        currentItem = item.closest('#basketItem')
        checkbox = currentItem.querySelector('#select-one')
        if (checkbox.checked) {
            totalGoods += (parseInt((item.value).replace(/\D/g, '')))
        }
    })
    return totalGoods
}

function isChecked(event) {
    const checkboxes = basketListHeader.querySelectorAll('#select-one')
    const headerCheckbox = basketListHeader.querySelector('#selectAll')
    if (event.target.dataset.action === 'select-all') {
        checkboxes.forEach(function (item) {
            item.checked = headerCheckbox.checked

        }
        )
    }
    sidebarTotalSum()
}

function paymentIsChecked(event) {
    const sidebarCheckbox = sidebar.querySelector('.real-checkbox')
    const sidebarBtn = sidebar.querySelector('.order-btn__text')
    const chargeOff = sidebar.querySelector('.charge-off')

    if (sidebarCheckbox.checked) {
        chargeOff.classList.add('none')
        const totalSum = totalBasketSum()
        sidebarBtn.innerText = 'Оплатить ' + totalSum + ' cом'
    }
    else {
        chargeOff.classList.remove('none')
        sidebarBtn.innerText = 'Заказать'
    }
}

function sidebarTotalSum() {
    const sidebarSum = sidebar.querySelector('.order-sum')
    const sum = totalBasketSum()
    return sidebarSum.innerText = formatter.format(sum)
}
function sidebarWithoutDiscount() {
    const sidebarDisc = sidebar.querySelector('.total-without-discount')
    const sum = totalWithoutDiscount()
    return sidebarDisc.innerText = formatter.format(sum)
}
function sidebarTotalGoods() {
    const sidebarGoods = sidebar.querySelector('.order-amount')
    const sum = totalGoods()
    return sidebarGoods.innerText = formatter.format(sum) + ' товара'
}

function priceClass(price) {
    price.innerText.length > 6 ? price.classList.add('amount-more') : price.classList.remove('amount-more')
}

function calcDiscount() {
    const el = sidebar.querySelector('.discount-total')
    const totalSum = totalBasketSum()
    const totalDisc = totalWithoutDiscount()
    return el.innerText = '−' + (formatter.format(+totalDisc - +totalSum))
}

function nameValidate() {
    const validateBody = recipientBody.querySelector('.name')
    const validateInput = validateBody.querySelector('.input-recipient')
    const label = validateBody.querySelector('.input-label')
    validateInput.addEventListener('keyup', function () {
        this.value ? label.innerText = this.placeholder : label.innerText = ''
        const valid = /^[А-ЯЁ][а-яё]+$/.test(this.value)
        if (valid || this.value === '') {
            validateBody.querySelector('.input-underline').classList.remove('red-underline')
            validateBody.querySelector('.name-error').innerText = ''

        }
        else {
            validateBody.querySelector('.input-underline').classList.add('red-underline')
            validateBody.querySelector('.name-error').innerText = 'Укажите имя'
        }
    })

}
function surnameValidate() {
    const validateBody = recipientBody.querySelector('.phone-number')
    const validateInput = validateBody.querySelector('.input-recipient')
    const label = validateBody.querySelector('.input-label')
    validateInput.addEventListener('keyup', function () {
        this.value ? label.innerText = this.placeholder : label.innerText = ''
        const valid = /^[А-ЯЁ][а-яё]+$/.test(this.value)
        if (valid || this.value === '') {
            validateBody.querySelector('.input-underline').classList.remove('red-underline')
            validateBody.querySelector('.name-error').innerText = ''

        }
        else {
            validateBody.querySelector('.input-underline').classList.add('red-underline')
            validateBody.querySelector('.name-error').innerText = 'Укажите номер'
        }
    })

}
function mailValidate() {
    const validateBody = recipientBody.querySelector('.mail')
    const validateInput = validateBody.querySelector('.input-recipient')
    const label = validateBody.querySelector('.input-label')
    validateInput.addEventListener('keyup', function () {
        this.value ? label.innerText = this.placeholder : label.innerText = ''
        const valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.value)
        if (valid || this.value === '') {
            validateBody.querySelector('.input-underline').classList.remove('red-underline')
            validateBody.querySelector('.name-error').innerText = ''

        }
        else {
            validateBody.querySelector('.input-underline').classList.add('red-underline')
            validateBody.querySelector('.name-error').innerText = 'Укажите почтовый ящик'
        }
    })

}
function phoneValidate() {
    const validateBody = recipientBody.querySelector('.phone-number')
    const validateInput = validateBody.querySelector('.input-recipient')
    const label = validateBody.querySelector('.input-label')
    validateInput.addEventListener('keyup', function () {
        this.value ? label.innerText = this.placeholder : label.innerText = ''
        const valid = /^\d+$/.test(this.value)
        if (valid || this.value === '') {
            validateBody.querySelector('.input-underline').classList.remove('red-underline')
            validateBody.querySelector('.name-error').innerText = ''

        }
        else {
            validateBody.querySelector('.input-underline').classList.add('red-underline')
            validateBody.querySelector('.name-error').innerText = 'Укажите номер'
        }
    })

}
function innValidate() {
    const validateBody = recipientBody.querySelector('.inn')
    const validateInput = validateBody.querySelector('.input-recipient')
    const label = validateBody.querySelector('.input-label')
    validateInput.addEventListener('keyup', function () {
        this.value ? label.innerText = this.placeholder : label.innerText = ''
        const valid = /^\d+$/.test(this.value)
        if (valid || this.value === '') {
            validateBody.querySelector('.input-underline').classList.remove('red-underline')
            validateBody.querySelector('.name-error').innerText = 'Для таможенного оформления'

        }
        else {
            validateBody.querySelector('.input-underline').classList.add('red-underline')
            validateBody.querySelector('.name-error').innerText = 'Укажите ИНН'
        }
    })

}

phoneValidate()
mailValidate()