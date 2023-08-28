import { model } from "./models/itemModel.js";

const newEl = model.map(item => {
    return `<div id="basketItem" class="item-template">
                <div class="list-item">
                    <div class="list-item__obj">
                        <div class="item-checkbox">
                            <label class="custom-checkbox">
                                <input type="checkbox" class="real-checkbox">
                                <span class="custom-checkbox__decor"></span>
                            </label>
                        </div>
                        <img src="${item.img}" class="item-img"></img>
                    </div>
                        <div class="list-item__description">
                            <div id="itemTitle" class="h3 item-title">${item.title}</div>
                            <div class="h4 item__property">
                                <div>${item.props.color}</div>
                                <div>${item.props.size}</div>
                            </div>
                            <div class="gray-text">
                                <div class="item-store">${item.store}</div>
                                <div class="item-marketplace">
                                    ${item.marketplace}
                                    <div class="item-info"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div class="list-item__price-block">
                            <div class="price-block__counter">
                                <div class="counter">
                                    <button id="decrementBtn" class="decrement"></button>
                                    <input id="inputCounter" type="text" class="count" value="1">
                                    <button id="incrementBtn" class="increment"></button>
                                </div>
                                <div class="goods-left">Осталось ${item.stock} шт.</div>
                                <div class="goods-actions">
                                    <button class="fav-btn"></button>
                                    <button class="del-btn"></button>
                                </div>
                            </div>
                            <div class="price-block__money">
                                <div class="new-price">
                                    <div class="h7 price-amount">522</div>
                                    <div class="h6 price-currency">сом</div>
                                </div>
                                <div class="gray-text old-price">1051 сом
                                    <span class="line-through"></span>
                                    <span class="dashed-bottom"></span>
                                </div>
                            </div>
                        </div>
            </div>`

}).join(' ')

if (model.props) {
    console.log(model.props)
}
model.forEach(item => console.log(item.props))


const el = document.querySelector('#basketList')
el.insertAdjacentHTML("beforeend", newEl)
const div = document.createElement('div')



