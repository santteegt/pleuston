import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import Empty from '../atoms/Empty'
import Asset from './Asset'

import styles from './AssetList.module.scss'

class AssetList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            offset: 30,
            page: 0,
            order: {
                value: 1
            }
        }
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
    async handlePageChange(pageChange) {
        await this.setState({ page: this.state.page + pageChange })
        this.props.handleSearch(this.state)
    }
    render() {
        const {
            assets,
            handleClick
        } = this.props
        return (
            <Fragment>
                <div className={styles.search}>
                    <form onSubmit={(e) => this.handleTextSearch(e)}>
                        <input type="text" value={this.state.text} onChange={(e) => this.handleTextChange(e)} />
                        <input type="submit" value="Search" />
                    </form>
                </div>
                {assets.length ? (
                    <Fragment>
                        <div className={styles.assets}>
                            {assets.map(asset => (
                                <div
                                    className={styles.tile}
                                    key={asset.assetId}
                                    onClick={() => handleClick(asset)}
                                    onKeyPress={() => handleClick(asset)}
                                    role="link"
                                    tabIndex={0}>
                                    <Asset asset={asset} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {this.state.page > 0 ? (<a href="#" className={styles.pageItem} onClick={() => this.handlePageChange(-1)}>&laquo; Prev page</a>) : null}
                            <span className={styles.pageItem}>{this.state.page}</span>
                            {assets.length < this.state.offset ? (<a href="#" className={styles.pageItem} onClick={() => this.handlePageChange(1)}>Next page &raquo;</a>) : null}
                        </div>
                    </Fragment>
                ) : (
                    <Empty title="No data sets found" text="Why not add some of yours?" action="+ Add new data set" actionLink="/new" />
                )}
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
