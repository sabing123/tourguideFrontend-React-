import React, { Component } from 'react'
import {Drawer,Header,Navigation,Content,Layout,Textfield} from 'react-mdl'

export default class sidenav extends Component {
  render() {
    return (
     <div>
{/* The drawer is always open in large screens. The header is always shown, even in small screens. */}
<div style={{height: '300px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="Admin Pannel" />
        <Drawer title="Tour Guide">
            <Navigation>
            <a href="/AdminDashboard">Dashboard</a>
                <a href="/PlaceList">Manage Place</a>
                <a href="/HotelList">Manage Hotel</a>
                <a href="/TrekkingList">Manage Treeking</a>
                <a href="/GuideList">Manage Tourist Guide</a>
            </Navigation>
        </Drawer>
        <Content> 
        </Content>
    </Layout>
</div>

     </div>

    )
  }
}

