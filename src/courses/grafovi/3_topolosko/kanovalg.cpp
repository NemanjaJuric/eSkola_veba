#include <iostream>
#include <vector>
#include <queue>

using namespace std;

void Kanov_algoritam(vector<vector<int>> &lista_povezanodsti){
    int n=lista_povezanodsti.size();    //broj cvorova u grafu
    vector<int> stepen(n);              //stepen svakog cvora 
    vector<int> topoloski_sortirani;    //niz u kome smestamo cvorove topoloski sortirano
    queue<int> red;                    //red potreban za algoritam, isto bi bilo i sa stekom
    
    //racunamo stepene cvorova
    for(int i=0;i<n;i++){
        for (int a:lista_povezanodsti[i]){
            stepen[a]++;
        }
    }
    
    //ubacujemo u red sve cvorove ciji je stepen nula
    for(int i=0;i<n;i++){
        if(stepen[i]==0) red.push(i);
    }


    int pocetakreda;
    while(!red.empty()){
        pocetakreda=red.front();
        topoloski_sortirani.push_back(pocetakreda);
        red.pop();
        for(int i:lista_povezanodsti[pocetakreda]){
            if(--stepen[i]==0)
                red.push(i);
        }
    }

    //stampamo topoloski sortirane cvorove
    cout<<"Kanov algoritam: ";
    for(int i=0;i<n-1;i++){
        cout<<topoloski_sortirani[i]<<" -> ";
    }
    cout<<topoloski_sortirani[n-1]<<'\n';


}

int main(){
    vector<vector<int>> lista_povezanodsti={{2,3},{0,3},{4},{2,4},{}};
    Kanov_algoritam(lista_povezanodsti);
    return 0;
}
