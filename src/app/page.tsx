'use client';

import TokenCompare from "@/components/TokenCompare";
import {SourceTargetProvider} from "@/context/SourceTargetContext";

export default function Home() {

    return (
        <div className="w-screen h-screen flex p-4">
            <SourceTargetProvider>
                <TokenCompare />
            </SourceTargetProvider>
        </div>
  );
}
