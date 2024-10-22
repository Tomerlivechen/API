
import { INewSocialGroup } from "../Models/SocialGroup";
import { request } from "../Utils/Axios-Interceptor";

const GroupURL = "/SocialGroup";



  const GetGroupbyId = (GroupId: string) =>
    request({
      url: `${GroupURL}/ById/${GroupId}")`,
      method: "Put",
      data: null,
    });

    const GetGroups = () =>
      request({
        url: `${GroupURL}`,
        method: "Get",
        data: null,
      });

      const JoinGroup = (GroupId: string) =>
        request({
          url: `${GroupURL}AddMember/${GroupId}`,
          method: "Put",
          data: null,
        });

        const RemoveMember = (GroupId: string, userId : string) =>
            request({
              url: `${GroupURL}AddMember/${GroupId}`,
              method: "Put",
              data: {id:userId},
            });

            const DeleteGroup = (GroupId: string) =>
                request({
                  url: `${GroupURL}/${GroupId}`,
                  method: "DELETE",
                  data: null,
                });
                const CreateGroup = (NewGroup: INewSocialGroup) =>
                    request({
                      url: `${GroupURL}`,
                      method: "POST",
                      data: NewGroup,
                    });


        
  export const Groups = {GetGroupbyId, GetGroups,JoinGroup,RemoveMember,DeleteGroup,CreateGroup}