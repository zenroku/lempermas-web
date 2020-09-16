import React, { useEffect, useState } from 'react'
import './FilterBar.css'
import DropdownInput from '../InputComponent/DropdownInput'
import { Input } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

function FilterBar({ categoryCallback, searchCallback, currentVal }) {
    const [scrolled, setScrolled] = useState(false)
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 178
            if (isTop !== true) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        })

        return () => {
            window.removeEventListener('scroll', () => {
                setScrolled(false)
            })
        }
    }, [])

    searchCallback(keyword)

    return (
        <div className={scrolled ? "filterBar__scrolled" : "filterBar"}>
            <div className="container filterBar__container">
                <DropdownInput tipe="category" categoryCallback={categoryCallback} currentVal={currentVal} />
                <form className="filterBar__search">
                    <SearchIcon style={{ color: 'var(--dark-green)' }} />
                    <Input onChange={(event) => setKeyword(event.target.value)} disableUnderline placeholder="Cari Produk" id="search" fullWidth />
                </form>
            </div>
        </div>
    )
}

export default FilterBar
