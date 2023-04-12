
import FlexBetween from "../../components/flexBetween"
import {Box} from "@mui/material";
import { InputBase,
     Typography,
     Bax,
     IconButton,
     Select,
     MenuItem,
     FormControl,
     useTheme,
     useMediaQuery,
     useThemeProps,
     } from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { useDispatch,useSelector } from "react-redux";
import { setMode,setLogout } from "../../redux/state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar=()=>{
    const [isMobileMenuToggled,setIsMobileMenuToggled]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user);
    
    const isNonMobileScreens=useMediaQuery("(min-width:1000px");
    const theme =useTheme();
    const neutralLight=theme.palette.neutral.light;
    const dark=theme.palette.neutral.dark;
    const primaryLight=theme.palette.primary.light;
    const background =theme.palette.background.default;
    
    
    const alt=theme.palette.background.alt;
    const fullName=`${user.firstName} ${user.lastName}`;
    return (
     
        <FlexBetween padding="1rem 6%" backgroundColor={alt} >
           <FlexBetween  gap="1.75rem">
            {/* logo or name for this website would be contain here */}
            <Typography 
            fontWeight="bold"
             color="primary"
             fontSize="clamp(1rem,2rem,2.2rem)"
             onClick={()=>{
                navigate("/home")
             }}
             sx={{
                "&:hover":{
                    color:primaryLight,
                    cursor:"pointer"
                }
             }}
             >Sociopedia
             </Typography>
          {/* this was basically my search box and i am  going write edroh approach */}
             {/* <FlexBetween padding={1} borderRadius={2} sx={{background:"lightblue"}}>
                <InputBase sx={{width:"200px"}} placeholder="Search">
               
                </InputBase>
                <SearchIcon/>
             </FlexBetween> */}

             {/* edroh aproach for design search box */}
             {/* let say we are working on nonmobilescreens hen we need 
             to show the search bar other not */}
            {isNonMobileScreens && (
                <FlexBetween backgroundColor={neutralLight} 
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}
           </FlexBetween>
           {/* <FlexBetween margin={1}  gap="1rem">
           </FlexBetween> */}
           {/* DESKTOP NAVBAR */}
           {/* onClick={()=>dispatch(setMode())} */}
            {isNonMobileScreens ?(
                <FlexBetween gap="2rem">
                    <IconButton onClick={()=>{
                        dispatch(setMode());
                        console.log("setMode clicked")
                    }}>
                        {theme.palette.mode==="dark"?(
                            <DarkMode sx={{fontSize:"25px"}}/>
                        ):(<LightMode sx={{color:dark,fontSize:"25px"}}/>)}
                    </IconButton>
                    <Message sx={{fontSize:"25px"}}/>
                    <Notifications sx={{fontSize:"25px"}}/>
                    <Help sx={{fontSize:"25px"}}/>
                    <FormControl variant="standard" value={fullName}>
                        <Select 
                        value={fullName}
                        sx={{
                            backgroundColor:neutralLight,
                            maxWidth:"200px",
                            borderRadius:"0.25rem",
                            p:"0.25rem 1rem",
                            "& .MuiSvgIcon-root":{
                                pr:"0.25rem",
                                width:"3rem"
                            },
                            "& .MuiSelect-select:focus":{
                                backgroungColor:neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                    
                            <MenuItem onClick={()=>{
                                  console.log("setLogout clicked")
                                return dispatch(setLogout());
                              
                            }} >
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ):(
                <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)} >
                    <Menu/>
                </IconButton>
            )}
            {/* MOBILE NAVBAR */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed"
                right="0"
                bottom="0"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                height="100%"
                backgroundColor={background}
                >
                {/* CLOSE BUTTON */}
                <Box display="flex" justifyContent="flex-end" p="1rem" >
                <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)} >
                    <Close/>
                </IconButton>
                </Box>
                {/* MENU ITEMS*/}
                <FlexBetween display="flex" flexDirection="column"  gap="3rem">
                    <IconButton onClick={()=>{
                        dispatch(setMode());
                        console.log("setMode clicked")
                    }} >
                        {theme.palette.mode==="dark"?(
                            <DarkMode sx={{fontSize:"25px"}}/>
                        ):(<LightMode sx={{color:dark,fontSize:"25px"}}/>)}
                    </IconButton>
                    <Message sx={{fontSize:"25px"}}/>
                    <Notifications sx={{fontSize:"25px"}}/>
                    <Help sx={{fontSize:"25px"}}/>
                    <FormControl variant="standard" value={fullName}>
                        <Select 
                        value={fullName}
                        sx={{
                            backgroundColor:neutralLight,
                            MaxWidth:"180px",
                            borderRadius:"0.25rem",
                            p:"0.25rem 1rem",
                            "& .MuiSvgIcon-root":{
                                pr:"0.25rem",
                                width:"3rem"
                            },
                            "& .MuiSelect-select:focus":{
                                backgroundColor:neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            {/* Need to write the function  for setLogout */}
                            <MenuItem onClick={()=>{
                        dispatch(setLogout());
                        console.log("setMode clicked")
                    }} >
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    )
}
export default NavBar;