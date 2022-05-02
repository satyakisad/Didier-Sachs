import styled from "styled-components"

const AnnouncementBar = styled.div`
 height: 30px;
 background-color: teal;
 color: white;
 display: flex;
 justify-content: center;
 align-items: center;
`

export default function Announcement() {
  return (
    <AnnouncementBar>
        This is a Deal! 90% off on our lovely stuff!
    </AnnouncementBar>
  )
}
