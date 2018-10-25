import React from 'react';
import Link from 'next/link';
import CreateOlive from '../components/create-olive'


export default class Olive extends React.Component {
    state = {
        olives: [],
    }

    constructor(props) {
        super(props);
        this.contents = null
    }

    static async getInitialProps({req}) {
        if (req) {
            const olive = require('../server/olive');
            console.log("getIntialProps", req.query);
            olive.find({branch: req.query.branch}, function(err, olive) {
                if (err) return {};

                return branch
            });
        }
        else {
            return {};
        }
    }

    createOlive = (data) => {
        fetch(config.SERVER_URL_PREFIX + '/api/create-olive', {
            method: "Post",
            credentials: 'include',
            body: JSON.stringify({
                branch: this.props.branch, 
                keyword: data.keyword,
                contents: data.contents 
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({olives: data})
        });
    }

    render() {
        console.log("props", this.props);
        return (
            <div>
                Olive Page
                <CreateOlive onCreate={data => this.createOlive(data)} />
            </div>
        );
    }
}