import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { TextField, InputAdornment, Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

import BaseAvatar from "~/components/ui/BaseAvatar";
import useAppDispatch from "~/hooks/useAppDispatch";
import useDebounced from "~/hooks/useDebouced";
import useClickOutside from "~/hooks/useClickOutSide";
import { searchUserService } from "~/services/userService";
import {
     clearCurrentConversation,
     selectContact,
} from "~/store/slices/conversationSlice";
import { SearchUserResponse, User } from "~/types";

const SearchBar = () => {
     const dispatch = useAppDispatch();

     const [searchContactValue, setSearchContactValue] = useState<string>("");
     const [searchUsers, setSearchUsers] = useState<User[]>([]);
     const [openUserDropdown, setOpenUserDropdown] = useState<boolean>(false);

     const searchDebouced = useDebounced(searchContactValue, 700);

     const handleClickOutside = () => {
          setOpenUserDropdown(false);
     };

     const usersRef = useClickOutside(handleClickOutside);

     useEffect(() => {
          if (!searchContactValue) {
               setSearchUsers([]);
               return;
          }

          (async () => {
               try {
                    const response: AxiosResponse<SearchUserResponse> =
                         await searchUserService(searchDebouced, 10);

                    if (response.status === 200) {
                         setOpenUserDropdown(true);
                         setSearchUsers(response.data.data);
                    }
               } catch (error) {
                    setOpenUserDropdown(false);
                    console.log(error);
               }
          })();
     }, [searchDebouced]);

     const handleSelectContact = (user: User) => {
          dispatch(selectContact(user));
          dispatch(clearCurrentConversation());
          setOpenUserDropdown(false);
     };

     return (
          <Box
               sx={{
                    padding: 1,
                    position: "relative",
               }}
          >
               <TextField
                    fullWidth
                    placeholder="Search"
                    value={searchContactValue}
                    onChange={(e) => setSearchContactValue(e.target.value)}
                    onFocus={() => setOpenUserDropdown(true)}
                    sx={{
                         backgroundColor: "background.paperChannel",
                         borderRadius: 4,
                    }}
                    InputProps={{
                         startAdornment: (
                              <InputAdornment position="start">
                                   <Search />
                              </InputAdornment>
                         ),
                    }}
               />
               {openUserDropdown && searchUsers.length > 0 && (
                    <Box
                         sx={{
                              padding: 1,
                              borderRadius: 6,
                              width: "100%",
                              position: "absolute",
                              left: 0,
                              zIndex: 1,
                              top: "100%",
                              backgroundColor: "background.paperChannel",
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                              boxShadow: 6,
                         }}
                         ref={usersRef}
                    >
                         {searchUsers.length > 0 &&
                              searchUsers.map((user) => {
                                   return (
                                        <Box
                                             key={user?._id}
                                             sx={{
                                                  padding: 1,
                                                  borderRadius: 5,
                                                  cursor: "pointer",
                                                  transition: "ease-in-out",
                                                  ":hover": {
                                                       backgroundColor:
                                                            "background.paper",
                                                  },
                                             }}
                                             onClick={() =>
                                                  handleSelectContact(user)
                                             }
                                        >
                                             <Box
                                                  sx={{
                                                       display: "flex",
                                                       alignItems: "center",
                                                       gap: 2,
                                                  }}
                                             >
                                                  <BaseAvatar
                                                       src={user?.avatar}
                                                       alt={user?.avatar}
                                                       isOnline={user?.isOnline}
                                                  />
                                                  <Box
                                                       sx={{
                                                            width: "100%",
                                                            display: "flex",
                                                            flexDirection:
                                                                 "column",
                                                       }}
                                                  >
                                                       <Typography
                                                            variant="body1"
                                                            sx={{
                                                                 color: "primary.main",
                                                            }}
                                                       >
                                                            {user?.firstname}{" "}
                                                            {user?.lastname}
                                                       </Typography>
                                                       <Typography variant="body2">
                                                            {user?.email}
                                                       </Typography>
                                                  </Box>
                                             </Box>
                                        </Box>
                                   );
                              })}
                    </Box>
               )}
          </Box>
     );
};

export default SearchBar;
