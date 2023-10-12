import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Checkbox, FormGroup, FormControlLabel, InputAdornment, Button, Divider, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/SearchPage.css';
import MenuBar from '../components/MenuBar';
import PetCardsContainer from '../components/PetCardsContainer';

const SearchPage = () => {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [nameParam, setNameParam] = useState('');
    const [petTypeParams, setPetTypeParams] = useState([]);
    const [petStatusParams, setPetStatusParams] = useState([]);
    const [minHeightParam, setMinHeightParam] = useState(0);
    const [maxHeightParam, setMaxHeightParam] = useState(100);
    const [minWeightParam, setMinWeightParam] = useState(0);
    const [maxWeightParam, setMaxWeightParam] = useState(100);
    const [petArray, setPetArray] = useState([]);

    const performSearch = async () => {
        try {
            const results = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets?name=${nameParam}&type=${petTypeParams}&status=${petStatusParams}&minHeight=${minHeightParam}&maxHeight=${maxHeightParam}&minWeight=${minWeightParam}&maxWeight=${maxWeightParam}`);
            setPetArray(results.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleName = (e) => {
        const newValue = e.target.value;
        setNameParam(newValue);
    }

    const handleTypeCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // If the checkbox is checked, add its value to the array
            setPetTypeParams([...petTypeParams, value]);
        } else {
            // If the checkbox is unchecked, remove its value from the array
            setPetTypeParams(petTypeParams.filter((item) => item !== value));
        }
    };

    const handleStatusCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // If the checkbox is checked, add its value to the array
            setPetStatusParams([...petStatusParams, value]);
        } else {
            // If the checkbox is unchecked, remove its value from the array
            setPetStatusParams(petStatusParams.filter((item) => item !== value));
        }
    };

    useEffect(() => {
        performSearch();
    }, [])

    return (<>
        <MenuBar />

        <div className="page-wrapp">
            <div className="content-wrap">
                <h1>Search pets</h1>

                <div className="search-controls">
                    <div className="basic-search-controls">
                        <FormGroup className="type-checkboxes">
                            <FormControlLabel control={<Checkbox color="success" />} label="&#128054; Dogs" value="dog" onChange={handleTypeCheckboxChange} />
                            <FormControlLabel control={<Checkbox color="success" onChange={handleTypeCheckboxChange} />} label="&#128049; Cats" value="cat" />
                        </FormGroup>

                    </div>
                    {showAdvancedSearch && <div className="advanced-search-controls">

                        <TextField id="name" label="Pet name" variant="outlined" onChange={handleName} value={nameParam} color="success" />

                        <FormGroup className="status-checkboxes">
                            <FormControlLabel control={<Checkbox color="success" />} label="Adopted" value="adopted" onChange={handleStatusCheckboxChange} />
                            <FormControlLabel control={<Checkbox color="success" onChange={handleStatusCheckboxChange} />} label="Fostered" value="fostered" />
                        </FormGroup>

                        <FormGroup>
                            <p>Height:</p>
                            <TextField margin="dense" label="From" id="min-height" size="small" color="success"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={minHeightParam}
                                onChange={e => setMinHeightParam(e.target.value)}
                            />

                            <TextField margin="dense" label="To" id="max-height" size="small" color="success"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={maxHeightParam}
                                onChange={e => setMaxHeightParam(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <p>Weight:</p>
                            <TextField margin="dense" label="From" id="min-weight" size="small" color="success"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>
                                }}
                                value={minWeightParam}
                                onChange={e => setMinWeightParam(e.target.value)}
                            />

                            <TextField margin="dense" label="To" id="max-weight" size="small" color="success"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>
                                }}
                                value={maxWeightParam}
                                onChange={e => setMaxWeightParam(e.target.value)}
                            />
                        </FormGroup>
                    </div>}

                    <Divider textAlign="left">
                        <Link color="inherit" underline="hover"
                            onClick={e => setShowAdvancedSearch(!showAdvancedSearch)}>
                            Advanced search{!showAdvancedSearch && <span>&#9660;</span>}  {showAdvancedSearch && <span>&#9650;</span>}</Link>
                    </Divider>

                    <Button startIcon={<SearchIcon />} variant="contained" color="success" onClick={performSearch}>search</Button>
                </div>

                <PetCardsContainer petObjectsArray={petArray} />

            </div>
        </div >
    </>);
};

export default SearchPage;