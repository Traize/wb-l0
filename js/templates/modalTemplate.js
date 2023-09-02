import { courierModel, pickupModel } from "../models/adressModel.js";

export const pickupAdress = pickupModel.map(item => {
    return `
    
    <div class="body-adress">
                <label class="custom-radio" name="pickup">
                     <div class="radio-wrapper">
                        <input type="radio" name="pickup" value="${item.id}" class="radio-btn">
                        <span class="custom-radio__decor"></span>
                    </div>
                     <div class="radio-text__wrapper">
                        <p class="radio-text">${item.text}</p>
                        <div class="description-misc">
                            <div class="adress-rating">
                                <div class="rating-icon"></div>
                                <div class="rating">4.99</div>
                            </div>
                            <div class="charge-off body-charge">Пункт выдачи</div>
                        </div>
                        </div>
                    </label>
                    <div class="radio-del__wrapper">
                        <div class="del-btn radio-del"></div>
                    </div>
                </div>`
}).join('')

export const courierAdress = courierModel.map(item => {
    return `
    <div class="body-adress">
                <label class="custom-radio">
                     <div class="radio-wrapper">
                        <input type="radio" class="radio-btn" name="courier">
                        <span class="custom-radio__decor"></span>
                    </div>
                     <div class="radio-text__wrapper">
                            <div class="radio-text">${item.text}</div>
                        </div>
                    </label>
                    <div class="radio-del__wrapper">
                        <div class="del-btn radio-del"></div>
                    </div>
                </div>`
}).join('')