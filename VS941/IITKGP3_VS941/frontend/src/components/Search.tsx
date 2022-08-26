import { ScrollArea, SegmentedControl, Select, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { BACKEND_URL } from "../constants";
import { useThemeContext } from "../hooks/useThemeContext";
import categories from "../utils/categories";
import debounce from "../utils/debounce";
import CaseItem from "./CaseItem";

function Search() {

    const {colorMode} = useThemeContext()

    const [query, setQuery] = useState("")
    const [cases, setCases] = useState<any[]>([])
    const [status, setStatus] = useState<string>('any')
    const [filteredCategories, setFilteredCategories] = useState<string[]>(categories)
    const [category, setCategory] = useState<string>('All categories')
    const [year, setYear] = useState<string>('Any year')

    useEffect(() => {
        axios.get(`${BACKEND_URL}/case/search?query=${query}&status=${status !== 'any' ? status : null}&category=${category !== 'All categories' ? category : null}&year=${year !== 'Any year' ? year : null}`)
            .then((response) => setCases(response.data.hits))
            .catch((err) => console.log(err))
    }, [query, status, category, year])

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if(userData  && !JSON.parse(userData).categoryAccess.includes("All categories")) {
            setFilteredCategories(JSON.parse(userData).categoryAccess)
            setCategory(JSON.parse(userData).categoryAccess[0])
        }
    }, [])

    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value))

    return(
        <div className="search">
            <h2>Legal Case Searcher</h2>
            <TextInput className="search-input" onChange={handleChange} placeholder="start typing here" icon={<IconSearch />} />
            <div className="filter-bar">
                <Select
                    size="md"
                    mr={30}
                    placeholder="Pick one"
                    searchable
                    nothingFound="No options"
                    value={category}
                    onChange={(value) => value === null ? setCategory('All categories') : setCategory(value)}
                    data={filteredCategories}
                />
                <SegmentedControl
                    color='blue'
                    mr={30}
                    size='md'
                    style={{backgroundColor: colorMode === 'light' ? '#fff' : '#25262b'}}
                    value={status}
                    onChange={setStatus}
                    data={[
                        { label: 'Any', value: 'any' },
                        { label: 'Disposed', value: 'disposed' },
                        { label: 'Pending', value: 'pending' },
                    ]}
                />
                <Select
                    size="md"
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={year}
                    onChange={(value) => value === null ? setYear('Any year') : setYear(value)}
                    data={['Any year', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']}
                />
            </div>
            <div className="search-case-list">
                <ScrollArea>
                    {cases.map((caseDetails) => <CaseItem caseDetails={caseDetails} key={caseDetails._id} />)}
                </ScrollArea>
            </div>
        </div>
    )
}

export default Search