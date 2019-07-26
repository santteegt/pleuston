import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { CSSTransition } from 'react-transition-group'
import Button from '../atoms/Button'
import FormInput from '../atoms/Form/FormInput'
import FormInputGroup from '../atoms/Form/FormInputGroup'
import AssetList from '../../components/Asset/AssetList'

import styles from './AssetSearch.module.scss'

const AssetFilters = () => (
    <fieldset className={styles.filters}>
        <FormInput small dimmed label="Type" name="type" component="select">
            <option />
            <option value="dataset">Data set</option>
            <option value="algorithm">Algorithm</option>
            <option value="container">Container</option>
            <option value="workflow">Workflow</option>
            <option value="other">Other</option>
        </FormInput>

        <FormInput
            small
            dimmed
            label="License"
            name="license"
            component="select"
        >
            <option />
            <option value="none">No License Specified</option>
            <option value="Public Domain">Public Domain</option>
            <option value="CC BY">CC BY: Attribution</option>
            <option value="CC BY-SA">CC BY-SA: Attribution ShareAlike</option>
            <option value="CC BY-ND">CC BY-ND: Attribution-NoDerivs</option>
            <option value="CC BY-NC">
                CC BY-NC: Attribution-NonCommercial
            </option>
            <option value="CC BY-NC-SA">
                CC BY-NC-SA: Attribution-NonCommercial-ShareAlike
            </option>
            <option value="CC BY-NC-ND">
                CC BY-NC-ND: Attribution-NonCommercial-NoDerivs
            </option>
        </FormInput>

        <FormInput
            small
            dimmed
            label="Update Frequency"
            name="updateFrequency"
            component="select"
        >
            <option />
            <option value="seldom">Seldom</option>
            <option value="annually">Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="never">Never expected to get updated</option>
        </FormInput>

        <FormInput
            small
            dimmed
            label="Price from"
            name="priceFrom"
            component="input"
            type="number"
        />

        <FormInput
            small
            dimmed
            label="Price to"
            name="priceTo"
            component="input"
            type="number"
        />

        <FormInput
            small
            dimmed
            label="Time added"
            name="addedIn"
            component="select"
        >
            <option />
            <option value="today">Today</option>
            <option value="thisMonth">This month</option>
            <option value="thisYear">This year</option>
        </FormInput>
    </fieldset>
)

class AssetSearch extends PureComponent {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleClick: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        handleSetPage: PropTypes.func.isRequired,
        assets: PropTypes.array.isRequired,
        totalPages: PropTypes.number.isRequired
    }

    state = {
        isFiltersShown: false
    }

    toggleFilters = () => {
        this.setState(prevState => ({
            isFiltersShown: !prevState.isFiltersShown
        }))
    }

    render() {
        const {
            page,
            handleSubmit,
            assets,
            handleClick,
            handleSetPage,
            totalPages
        } = this.props
        const { isFiltersShown } = this.state

        return (
            <>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <FormInputGroup>
                        <FormInput
                            dimmed
                            label="Search"
                            name="text"
                            component="input"
                            type="search"
                            placeholder="Search for keyword in the name or description."
                            additionalComponent={
                                <Button type="submit">Search</Button>
                            }
                        />
                    </FormInputGroup>

                    <aside className={styles.searchActions}>
                        <Button link onClick={this.toggleFilters}>
                            {isFiltersShown ? '- Close' : '+ Advanced search'}
                        </Button>
                    </aside>

                    <CSSTransition
                        classNames="grow"
                        in={isFiltersShown}
                        timeout={200}
                        unmountOnExit
                        onExit={() => this.setState({ isFiltersShown: false })}
                    >
                        <AssetFilters />
                    </CSSTransition>
                </form>

                <AssetList assets={assets} handleClick={handleClick} />

                {/* TODO: WARNING! This doesn't work as intended until we can check 'page'
                against total number of pages */}
                {page > 1 && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.item}
                            onClick={() => handleSetPage(page - 1)}
                        >
                            &lt; Prev page
                        </button>
                        <span className={styles.item}>{page}</span>
                        {page <= totalPages && (
                            <button
                                className={styles.item}
                                onClick={() => handleSetPage(page + 1)}
                            >
                                Next page &gt;
                            </button>
                        )}
                    </div>
                )}
            </>
        )
    }
}

const AssetSearchForm = reduxForm({
    form: 'assetSearch'
})(AssetSearch)

export default AssetSearchForm
