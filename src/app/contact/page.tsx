import * as React from "react"
import { Metadata } from "next"
import { ContactClient } from "./contact-client"

export const metadata: Metadata = {
  title: "contact.info() | 联系方式",
  description: "与我取得联系，讨论技术问题或合作机会。",
}

export default function ContactPage() {
  return <ContactClient />
}
