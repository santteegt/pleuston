import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import Empty from '../atoms/Empty'
import Asset from './Asset'
import './AssetList.scss'

class AssetList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            offset: 12,
            page: 0,
            order: {
                value: 1
            }
        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleTextSearch = this.handleTextSearch.bind(this)
        this.handleNextPage = this.handleNextPage.bind(this)
        this.handlePrevPage = this.handlePrevPage.bind(this)
    }
    componentDidMount() {
        this.setState({
            text: this.props.query.text,
            offset: this.props.query.offset,
            page: this.props.query.page
        })
    }
    handleTextChange(event) {
        this.setState({ text: event.target.value })
    }
    handleTextSearch(event) {
        event.preventDefault()
        this.props.handleSearch(this.state)
    }
    async handleNextPage() {
        await this.setState({ page: this.state.page + 1 })
        this.props.handleSearch(this.state)
    }
    async handlePrevPage() {
        await this.setState({ page: this.state.page - 1 })
        this.props.handleSearch(this.state)
    }
    render() {
        const {
            assets,
            handleClick
        } = this.props
        return (
            <Fragment>
                <form onSubmit={this.handleTextSearch}>
                    <label>
                        Text query
                        <input type="text" value={this.state.text} onChange={this.handleTextChange} />
                    </label>
                    <input type="submit" value="Search" />
                </form>
                {assets.length ? (
                    <Fragment>
                        <div className="assets">
                            {assets.map(asset => (
                                <div
                                    className="assets__tile assets_count"
                                    key={asset.assetId}
                                    onClick={() => handleClick(asset)}
                                    onKeyPress={() => handleClick(asset)}
                                    role="link"
                                    tabIndex={0}>
                                    <Asset asset={asset} />
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ) : (
                    <Empty title="No data sets found" text="Why not add some of yours?" action="+ Add new data set" actionLink="/new" />
                )}
                <Fragment>
                    {this.state.page > 0 ? (<a href="#" onClick={this.handlePrevPage}>Prev page</a>) : null}
                    {assets.length < this.state.offset ? (<a href="#" onClick={this.handleNextPage}>Next page</a>) : null}
                </Fragment>
            </Fragment>
        )
    }
}

AssetList.propTypes = {
    query: PropTypes.shape({
        offset: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    assets: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
}

export default AssetList
