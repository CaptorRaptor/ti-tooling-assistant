import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import ToolPage from './pages/tool-page';
import { theme, DrawerAppBar } from './components/ui';
import ASCIIArtPage from './pages/ascii-art-page';
import GradientManagerPage from './pages/gradient-manager-page';
import ItemStoragePage from './pages/item-storage-page';
import { getDefaultPageState, GradientState, ItemSave, LoadData, PageState, SaveData, updatePageState } from './lib/persistence';
import React from 'react';
import { Gradient } from './lib/color';
import { AsciiArtState } from './lib/persistence/ascii-art-state';

const appTitle = 'TI:LEGACY TOOLING ASSISTENT';

function App() {
    const [state, setState] = React.useState<PageState>(getDefaultPageState());
    const [loading, setLoading] = React.useState<boolean>(true);
    const [tabIndex, setTabIndex] = React.useState(0);

    React.useEffect(()=>{
        setState(LoadData());
        setLoading(false);
        return () => {
            setLoading(true);
            setState(getDefaultPageState());
        };
    },[]);

    const handleChange = (newState: PageState) =>{
        if(!loading){
            setState(newState);
            SaveData(newState);
        }
    }

    const handleItemLoad = (item:ItemSave) =>{
        let toolState = {
            ...state.toolState
        }
        toolState.applyMode = item.applyMode;
        toolState.item = item.item;
        toolState.pattern = item.pattern;
        toolState.patternOpt = item.patternOpt;
        toolState.toolOpt = item.toolOpt;
        handleChange(updatePageState(state, 'toolState', toolState));
        setTabIndex(0);
    }

    const handleItemSave = (name:string) =>{
        const index = state.savedItemList.map((i) => i.name).indexOf(name);
        let newList = [...state.savedItemList];
        if(index === -1)
            newList.push({name: name, ...state.toolState});
        else
           newList.splice(index, 1, {name: name, ...state.toolState});
        handleChange(updatePageState(state,'savedItemList', newList));
    }

    const handleItemStorageChange = (list: ItemSave[]) => {
        handleChange(updatePageState(state, 'savedItemList', list))
    }
    
    const handleGradientStorageChange = (list: Gradient[]) => {
        handleChange(updatePageState(state, 'customGradientList', list))
    }
    
    const handleGradientLoad = (gradient: Gradient) =>{
        let toolState = {
            ...state.toolState
        }
        toolState.gradient = gradient.name;
        toolState.pattern = gradient.colors;
        handleChange(updatePageState(state, 'toolState', toolState));
        setTabIndex(0);
    }

    const handleGradientState = (gradientState:GradientState) =>{
        handleChange(updatePageState(state,'gradientState', gradientState));
    }

    const handleGradientSave = () =>{
        let newState = {
            ...state.gradientState,
        }
        newState.pattern = state.toolState.pattern;
        handleGradientState(newState);
        setTabIndex(2);
    }
    
    const handleAsciiArtState = (asciiState:AsciiArtState) =>{
        handleChange(updatePageState(state,'asciiArtState', asciiState));
    }


    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <DrawerAppBar title={appTitle} value={tabIndex} onChange={setTabIndex}>
                {[
                    {
                        name: 'String Tool',
                        content: <ToolPage 
                            state={state.toolState} 
                            onChange={(ts)=> handleChange(updatePageState(state, 'toolState', ts))}
                            onSaveItem={handleItemSave}
                            onSaveGradient={handleGradientSave}
                            customGradientList={state.customGradientList} 
                            isLoading={loading}
                            savedItems={state.savedItemList}
                        />
                    },
                    {
                        name: 'ASCII Art Draw Pad',
                        disabled: true,
                        content: <ASCIIArtPage 
                            isLoading={loading}
                            value={state.asciiArtState}
                            onChange={handleAsciiArtState}
                        />
                    },
                    {
                        name: 'Gradient Manager',
                        content: <GradientManagerPage 
                            isLoading={loading}
                            onLoad={handleGradientLoad}
                            value={state.customGradientList}
                            onChange={handleGradientStorageChange}
                            editorState={state.gradientState}
                            onStateChange={handleGradientState}/>
                    },
                    {
                        name: 'Item Storage',
                        content: <ItemStoragePage 
                            isLoading={loading} 
                            onChange={handleItemStorageChange} 
                            onLoad={handleItemLoad} 
                            value={state.savedItemList}
                        />
                    }
                ]}
                </DrawerAppBar>
            </ThemeProvider>
        </div>
    );
}

export default App;
