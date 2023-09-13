import { useEffect, useState } from "react";
import { HStack, VStack, useToast } from "native-base";
import { useRoute } from "@react-navigation/native";
import { Share } from "react-native";
import { api } from "../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";

interface RouterPerams {
  id: string;
}

export function Details() {
  const [optionsSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isPoolDetails, setPoolDetails] = useState<PoolCardPros>(
    {} as PoolCardPros
  );
  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouterPerams;

  async function fetchPooolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: isPoolDetails.code,
    });
  }

  useEffect(() => {
    fetchPooolDetails();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={isPoolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {isPoolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={isPoolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionsSelected == "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />
            <Option
              title="Ranking do grudo"
              isSelected={optionsSelected == "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={isPoolDetails.code} />
      )}
    </VStack>
  );
}
