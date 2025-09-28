export default function ProfileDashboard() {
    return(
        <div id="ProfileDashboard" className="w-[100%] h-[100vh] overflow-y-scroll px-10 pt-5">
            <h1 className="text-5xl text-center font-bold pb-[30px]">Manajemen Profile</h1>

            <div id="profile-tab" className="bg-[#D9D9D9] h-[100%] rounded-[10px] p-10 mb-10 space-y-2.5">
                <img src="/default_profile_picture.svg" alt="" className="w-[30vh] aspect-square rounded-full mx-auto"/>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" className="w-full bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" className="w-full bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" className="w-full bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <button type="submit" className="w-full p-2 text-black bg-[#FFFFFF] rounded-[10px] h-[7vh] mt-[60px]">
                    Submit
                </button>
            </div>
        </div>
    );
}