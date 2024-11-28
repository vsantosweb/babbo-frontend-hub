import { VStack } from "@chakra-ui/react";
import TicketCard from "./ticket-card";
import { PurchasesProps } from "@/types";

export default function TicketList({ purchases }: { purchases: PurchasesProps[] }) {

    if (purchases) {
        return (
            <VStack spacing={4} >
                {purchases.map((purchase) => (
                    <TicketCard key={purchase.order} purchase={purchase} />
                ))}
            </VStack>
        );
    }

}