import React from "react"
import { Layout, Space } from "antd"
import { SocialLinks, IconSize } from "../../constants/settings"
import { LinkedinFilled, GithubFilled, MailFilled } from "@ant-design/icons"

export default function Footer() {
  const socialIconStyle = { fontSize: `${IconSize}px` }
  const renderSocialLinks = () => {
    const socialLinks = SocialLinks.map((link, index) => {
      switch (link.type) {
        case "linkedin":
          return (
            <a key={index} href={link.url} target="_blank" rel="noreferrer">
              <LinkedinFilled style={socialIconStyle} />
            </a>
          )
        case "github":
          return (
            <a key={index} href={link.url} target="_blank" rel="noreferrer">
              <GithubFilled style={socialIconStyle} />
            </a>
          )
        case "mail":
          return (
            <a key={index} href={link.url} target="_blank" rel="noreferrer">
              <MailFilled style={socialIconStyle} />
            </a>
          )
      }
    })
    return socialLinks
  }

  return (
    <React.Fragment>
      <Layout.Footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        Oleksandr Korol ©2023 <Space>{renderSocialLinks()}</Space>
      </Layout.Footer>
    </React.Fragment>
  )
}
