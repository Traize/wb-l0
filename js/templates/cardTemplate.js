import { cardModel } from "../models/cardModel.js";

export const cardTemplate = cardModel.map(item => {
    return `
    <div class="body-adress">
        <label class="custom-radio" name="card">
                     <div class="radio-wrapper card__radio-wrapper">
                        <input type="radio" name="card" value="${item.id}" class="radio-btn">
                        <span class="custom-radio__decor"></span>
                    </div>
                     <div class="radio-text__wrapper card-text__wrapper">
                        <div class="payment-system__wrapper">
                            <img src="${item.img}" class="pay-system__icon"></img>
                        </div>
                        <p class="radio-text">${item.num}</p>
                        </div>
                    </label>
            </div>
    `
}
).join('')