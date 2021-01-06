#include<iostream>
#include<vector>

using namespace std;

vector<vector<int>> lista_povezanosti={{2,3},{0,3},{4},{2,4},{}};
vector<bool> posecen(lista_povezanosti.size()); 



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
    topoloskoDFS();
    return 0;
}
