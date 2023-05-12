import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Participant } from "../components/Participant";
import { useState } from "react";

export function Home() {
    //const participants = ['Rodrigo', 'Vini', 'Diego', 'Biro', 'Ana', 'Isa', 'Jack', 'Mayk', 'João'];
    const [participant, setParticipant] = useState('');
    const [participants, setParticipants] = useState(['ana']);
    function handleParticipantAdd() {
        if(participants.includes(participant)){
            return Alert.alert('Participante já existe','O participante infomado já exite.')
        }else if(participant.trim() === ""){
            return Alert.alert('Informe o nome','Informe o nome do participante.')    
        }
        setParticipants(prevState => [...prevState, participant]);
        setParticipant('');
    }

    function handleParticipantRemove(name) {
        Alert.alert('Remover?',`Tem certeza que deseja remover ${name}?`,[
            {
                text: 'Não'
            },
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(part => part !== name))
            },
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Evento
            </Text>

            <Text style={styles.eventDate}>
                Quinta, 11 de maio de 2023.
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    value={participant}
                    onChangeText={setParticipant}
                />

                <TouchableOpacity style={styles.buttonAdd} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Participant
                    name={item}
                    remove={()=>handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
        </View>
    );
}