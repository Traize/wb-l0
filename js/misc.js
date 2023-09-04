export const formatter = new Intl.NumberFormat('ru', { maximumFractionDigits: 0 })

    //<div class="price-block__money price-block__money-mobile">
    // < div class="new-price" >
    //                                 <div class="h7 price-amount data-id=${item.id}">${formatter.format(item.newPrice * item.defaultValue)}</div>
    //                                 <div class="h6 price-currency">${item.currency}</div>
    //                             </ >
    // <div class="gray-text popup old-price ${(item.oldPrice.length > 6) ? " old-price-big" : ''}" >
    //                                 <div class="discount-price">${formatter.format((item.oldPrice * item.defaultValue))}</div>
    //                                 <div class="price-currency discount-currency">${item.currency}</div>
    //                                 <span class="line-through"></span>
    //                                 <span class="dashed-bottom discount-dash"></span>
    //                             </div >
    //                         </div >