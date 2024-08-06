import { useState, useEffect, React } from 'react'

import GiftsOpen from '../views/transactions/receivemoney/giftsopen'
import GiftsSee from '../views/transactions/receivemoney/giftssee'


export const ExternPagesRouter = [
    {
        path: "Gift/Open/:refgift/:idsender/:idreceiver",
        element: <GiftsOpen />,
    },

    {
        path: "Gift/See/:refgift/:idsender/:idreceiver",
        element: <GiftsSee />,
    },



]

