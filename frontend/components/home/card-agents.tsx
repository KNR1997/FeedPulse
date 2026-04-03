import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export const CardAgents = () => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
      <CardBody className="py-5 gap-6">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              {"⭐"}Contributors
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-col">
          <span className="text-xs">
            Meet your developers and see their ranks to get the best results
          </span>
          <AvatarGroup isBordered>
            <Link href="https://github.com/KNR1997">
              <Avatar src="https://avatars.githubusercontent.com/u/74903960?v=4" />
            </Link>
          </AvatarGroup>
        </div>
      </CardBody>
    </Card>
  );
};
