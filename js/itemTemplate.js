import { model } from "./models/itemModel.js";
import { formatter } from "./misc.js";
export const newEl = model
    .map((item) => {
        return `<div id="basketItem" class="item-template" data-id="${item.id}">
                <div class="list-item">
                    <div class="list-item__obj">
                        <div class="item-checkbox">
                            <label class="custom-checkbox">
                                <input id="select-one" checked type="checkbox" class="real-checkbox" data-action="checkbox">
                                <span class="custom-checkbox__decor" ></span>
                            </label>
                        </div>
                        <div class="img-wrapper"><img src="${item.img}" class="item-img"></img></div>
                    </div>
                        <div id="listItemDescription" class="list-item__description">
                            <div id="itemTitle" class="h3 item-title">${item.title
            }</div>
                            <div id="itemProps" class="h4 item__property ${!(item.props.color || item.props.size)
                ? "item__property-hidden"
                : ""}">
                                <div id="propsColor">${item.props.color}</div>
                                <div id="propsSize">${item.props.size}</div>
                            </div>
                            <div class="gray-text">
                                <div class="item-store">${item.store}</div>
                                <div class="item-marketplace">
                                    ${item.marketplace}
                                    <div class="item-info popup">
                                        <div class="info-popup__wraper none">
                                            <div class="popup-background">
                                                <div class="popup-text">
                                                    <div class="info-company">${item.info.company}</div> 
                                                    <div class="ogrn-company">ОГРН: ${item.info.ogrn}</div> 
                                                    <div class="adress-company">${item.info.adress}</div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div class="list-item__price-block">
                            <div class="price-block__counter">
                                <div id="counter" class="counter" data-id="${item.id}">
                                    <button id="decrementBtn" class="decrement" data-action="decrement"></button>
                                    <input id="inputCounter" type="number" class="count" value="${item.defaultValue}" pattern="{1,3}" data-action="input">
                                    <button id="incrementBtn" class="increment" data-action="increment"></button>
                                </div>
                                <div class="goods-left ${(+item.stock > 10) ? "goods-hidden" : ""}">Осталось ${item.stock} шт.</div>
                                <div class="goods-actions">
                                    <button class="fav-btn" data-action="favorite"></button>
                                    <button class="del-btn" data-action="delete"></button>
                                </div>
                            </div>
                            <div class="price-block__money">
                                <div class="new-price ${(item.newPrice.length > 3) ? "new-price-big" : ""}">
                                    <div class="h7 price-amount data-id=${item.id} ${(item.newPrice.length > 3) ? "amount-more" : ""}">${formatter.format(item.newPrice * item.defaultValue)}</div>
                                    <div class="h6 price-currency">${item.currency}</div>
                                </div>
                                <div  class="gray-text popup old-price ${(item.oldPrice.length > 6) ? "old-price-big" : ''}">
                                    <div class="discount-price">${formatter.format((item.oldPrice * item.defaultValue))}</div>
                                    <div class="price-currency discount-currency">${item.currency}</div>
                                    <span class="line-through"></span>
                                    <span class="dashed-bottom discount-dash"></span>
                                        <div class="info-popup__wraper dicount-info__popup none">
                                            <div class="popup-background">
                                                <div class="popup-text discount-popup">
                                                    <div class="info-percent">Скидка: ${item.discount.percent}</div> 
                                                    <div class="perc-num">${item.discount.percentToNum} ${item.currency}</div> 
                                                    <div class="info-percent">Скидка покупателя: ${item.discount.profileDiscPercent}</div>
                                                    <div class="perc-num">${item.discount.profileDiscNum} ${item.currency}</div> 
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
            </div>`;
    })
    .join("");

