import Confirm from "../../components/cart/Confirm"
import OrderForm from "../../components/cart/OrderForm"
import PaymentForm from "../../components/cart/PaymentForm"
import Breadcrumb from "../../components/cart/Breadcrumb"
import CartBar from "../../components/cart/CartBar"
import { useCart } from "react-use-cart"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const labels = [
  {
    label: "オンライン決済",
    desc:
      "各種クレジットカード, Apple Pay, Google Payが手数料無料でご利用いただけます.",
  },
  {
    label: "代金引換",
    desc: "ご自宅までお届けの際に、配達のスタッフへ直接お支払いください.",
  },
]
export default function Payment(props) {
  const router = useRouter()
  const { items, cartTotal } = useCart()
  // console.log(items);
  const [pay, setPay] = useState(labels[0]["label"])
  const [coupon, setCoupon] = useState({ id: "" })
  const [form, setForm] = useState({ key: "ORDER", value: {} })

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/")
    }
  }, [])

  // useEffect(() => {
  //   document.body.scrollTop = 0 // For Safari
  //   document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  // }, [form])

  const locals = {
    ...props,
    items,
    cartTotal,
    labels,
    coupon,
    setCoupon,
    pay,
    setPay,
    form,
    setForm,
  }

  return items.length > 0 && (
    <div className="pb-8">
      <CartBar {...locals} />
      <Breadcrumb {...locals} />
      <Conditional {...locals} />
    </div>
  ) 
}

const Conditional = (props) => {
  switch (props.form.key) {
    case "CONFIRM":
      return <Confirm {...props} />
    case "ORDER":
      return <OrderForm {...props} />
    case "PAYMENT":
      return <PaymentForm {...props} />
  }
}
