#include <iostream>
#include <vector>
#include <stack>

using namespace std;

vector<vector<int>> lista_povezanosti={{2,3},{0,3},{4},{2,4},{}};
vector<bool> posecen(lista_povezanosti.size()); 

void Kanov_algoritam(vector<vector<int>> &lista_povezanodsti){
    int n=lista_povezanodsti.size();    //broj cvorova u grafu
    vector<int> stepen(n);              //stepen svakog cvora 
    vector<int> topoloski_sortirani;    //niz u kome smestamo cvorove topoloski sortirano
    stack<int> stek;                    //stek potreban za algoritam, isto bi bilo i sa redom
    
    //racunamo stepene cvorova
    for(int i=0;i<n;i++){
        for (int a:lista_povezanodsti[i]){
            stepen[a]++;
        }
    }
    
    //ubacujemo u stek sve cvorove ciji je stepen nula
    for(int i=0;i<n;i++){
        if(stepen[i]==0) stek.push(i);
    }


    int vrhsteka;
    while(!stek.empty()){
        vrhsteka=stek.top();
        topoloski_sortirani.push_back(vrhsteka);
        stek.pop();
        for(int i:lista_povezanodsti[vrhsteka]){
            if(--stepen[i]==0)
                stek.push(i);
        }
    }

    //stampamo topoloski sortirane cvorove
    cout<<"Kanov algoritam: ";
    for(int i=0;i<n-1;i++){
        cout<<topoloski_sortirani[i]<<" -> ";
    }
    cout<<topoloski_sortirani[n-1]<<'\n';


}


void dfs(int u,vector<int> &DFSraspored) {  //prethodna lekcija obradjuje dfs pa pogledajte
    posecen[u]=true;
    for(int i:lista_povezanosti[u]){
        if(!posecen[i])
        dfs(i,DFSraspored);         //ovo nam osigurava da se svi cvorovi koji zavise od u smeste u DFSraspored pre cvora u
    }
    DFSraspored.push_back(u);       // cvor u se dodaje u niz tek kada se svi ostali koji zavise od njega dodaju
}

void topoloskoDFS(){
    vector<int> DFSraspored; //vektor za redosled zavrsetka rekurzivnog poziva

    //osiguravamo se da smo posetili sve cvorove DFS obilaskom
    for(int i=0;i<lista_povezanosti.size();i++){
        if(!posecen[i])
            dfs(i,DFSraspored);
    }

    //Jos samo da okrenemo vektor DFSraspored
    int n=DFSraspored.size()-1;
    cout<<"Topolosko sortiranje DFS-om: ";
    for(int i=0;i<n;i++){
        cout<<DFSraspored[n-i]<<" -> ";
    }
    cout<<DFSraspored[0]<<endl;

}

int main(){
    Kanov_algoritam(lista_povezanosti);
    topoloskoDFS();
    return 0;
}
 
