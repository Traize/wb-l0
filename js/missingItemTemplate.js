import { missingModel } from "./models/missingItemModel.js";
export const missingEl = missingModel
    .map((item) => {
        return `<div id="missingItem" class="item-template missing-item">
                <div class="list-item missing-list">
                    <div class="list-item__obj">
                         <div class="mobile-size ${!(item.mobileSize) ? "mobile-size-hidden" : ""}">${item.mobileSize}</div>
                        <div class="img-wrapper"><img src="${item.img}" class="item-img missing-img"></img></div>
                    </div>
                        <div id="listItemDescription" class="list-item__description">
                            <div id="itemTitle" class="h3 item-title" data-model-item${item.id}>${item.title}</div>
                            <div id="itemProps" class="h4 item__property ${!(item.props.color || item.props.size) ? "item__property-hidden" : ""}">
                                <div id="propsColor">${item.props.color}</div>
                                <div id="propsSize" class="props-size">${item.props.size}</div>
                            </div>
                        </div>
                    </div>
                        <div class="list-item__price-block missing__mobile-action">
                            <div class="missing-items__actions">
                                <div class="goods-actions">
                                    <button class="fav-btn" data-action="favorite"></button>
                                    <button class="del-btn" data-action="delete" ></button>
                                </div>
                            </div>
                        </div>
            </div>`;
    }).join('')


