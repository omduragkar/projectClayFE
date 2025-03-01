import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = ({ name, email, linkedin }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentee Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
            {name[0]}
          </div>
          <div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
            <a href={linkedin} className="text-blue-500 text-sm">LinkedIn</a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
